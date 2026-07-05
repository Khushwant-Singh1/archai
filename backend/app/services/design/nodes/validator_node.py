import os
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_openai import ChatOpenAI
from pydantic import ValidationError
import logging
from services.design.validators import RequirementValidationReport, validate_requirement_report

logger = logging.getLogger(__name__)

REQUIREMENT_VALIDATION_PROMPT = """
You are a senior Business Analyst and Systems Architect.
Your task is to review the following Software Requirements Specification (SRS) or Product Requirements Document (PRD) and find critical issues.

Specifically, look for:
1. Missing requirements: Crucial features or logical steps that are left out (e.g., checkout flow without a payment gateway).
2. Contradictory requirements: Statements that conflict with each other (e.g., "The application must work completely offline" vs "Every action must immediately sync to the cloud").
3. Ambiguous statements: Vague descriptions that are impossible to implement without clarification.
4. Impossible expectations: Requirements that defy technical limitations or physics (e.g., "zero latency over the internet").

Provide a JSON output containing an array of 'issues' with 'issue_type', 'description', 'severity' (high, medium, low), and an exact 'snippet' from the text that caused the issue. If no issues are found, return an empty array.

Document:
{document_text}

Output ONLY valid JSON matching the schema:
{format_instructions}
"""

async def validate_requirements_llm(document_text: str) -> dict:
    """
    Analyzes the SRS for missing, contradictory, ambiguous, or impossible requirements.
    Returns a dictionary matching the RequirementValidationReport schema.
    """
    parser = JsonOutputParser(pydantic_object=RequirementValidationReport)
    
    prompt = PromptTemplate(
        template=REQUIREMENT_VALIDATION_PROMPT,
        input_variables=["document_text"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )
    
    model_name = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    llm = ChatOpenAI(model=model_name, temperature=0.1)
    
    chain = prompt | llm | parser
    
    try:
        result = await chain.ainvoke({"document_text": document_text})
        validated_result = validate_requirement_report(result)
        return validated_result
    except ValidationError as e:
        logger.error(f"Validation error in requirement validator: {e}")
        return {"issues": []}
    except Exception as e:
        logger.error(f"Error in requirement validator: {e}")
        return {"issues": []}
