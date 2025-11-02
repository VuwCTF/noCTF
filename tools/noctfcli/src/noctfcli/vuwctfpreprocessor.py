from noctfcli.preprocessor import PreprocessorBase
from noctfcli.models import ChallengeConfig, ScoringConfig

class VuwctfPreprocessor(PreprocessorBase):
    def __init__(self, config_path):
        pass

    def preprocess(self, data: ChallengeConfig) -> ChallengeConfig:
        """Add custom scoring configuration & remap difficulties"""

        data.scoring = ScoringConfig(
            strategy="core:quadratic",
            params={"initial": 500, "minimum": 100, "decay": 20},
        )

        match data.difficulty:
            case "beginner":
                data.difficulty = "easy"
            case "intermediate":
                data.difficulty = "medium"
            case "advanced":
                data.difficulty = "hard"
            case _:
                raise ValueError(f"Unknown difficulty level: {data.difficulty}")

        return data