from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]

PROMPTS_DIR = BASE_DIR / "prompts"


def load_prompt(relative_path: str) -> str:
    file_path = PROMPTS_DIR / relative_path

    if not file_path.exists():
        return ""

    return file_path.read_text(
        encoding="utf-8",
        errors="ignore"
    )