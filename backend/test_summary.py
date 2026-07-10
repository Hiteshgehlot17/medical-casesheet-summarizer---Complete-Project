from app.ai.llm_service import summarize_medical_text

sample_text = """
Patient Name: John
Age: 45

Diagnosis:
Type 2 Diabetes Mellitus

Medicine:
Metformin 500 mg

Advice:
Low sugar diet.
Exercise daily.
"""

summary = summarize_medical_text(sample_text)

print(summary)