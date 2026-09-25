from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Job = Literal[
    "admin.",
    "blue-collar",
    "entrepreneur",
    "housemaid",
    "management",
    "retired",
    "self-employed",
    "services",
    "student",
    "technician",
    "unemployed",
    "unknown",
]
Marital = Literal["married", "single", "divorced", "unknown"]
Education = Literal[
    "basic.4y",
    "basic.6y",
    "basic.9y",
    "high.school",
    "illiterate",
    "professional.course",
    "university.degree",
    "unknown",
]
YesNoUnknown = Literal["no", "yes", "unknown"]
Contact = Literal["cellular", "telephone"]
Month = Literal["mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
DayOfWeek = Literal["mon", "tue", "wed", "thu", "fri"]
POutcome = Literal["nonexistent", "failure", "success"]


class PredictionRequest(BaseModel):
    """Input features collected by the prediction form on the frontend."""

    model_config = ConfigDict(populate_by_name=True)

    age: int = Field(..., ge=17, le=98, description="Client age in years")
    job: Job = Field(..., description="Type of job")
    marital: Marital = Field(..., description="Marital status")
    education: Education = Field(..., description="Education level")
    default: YesNoUnknown = Field(..., description="Has credit in default?")
    housing: YesNoUnknown = Field(..., description="Has housing loan?")
    loan: YesNoUnknown = Field(..., description="Has personal loan?")
    contact: Contact = Field(..., description="Contact communication type")
    month: Month = Field(..., description="Last contact month of year")
    day_of_week: DayOfWeek = Field(..., description="Last contact day of the week")
    campaign: int = Field(..., ge=1, le=60, description="Number of contacts during this campaign")
    pdays: int = Field(..., ge=0, le=999, description="Days since last contact; 999 means never contacted")
    previous: int = Field(..., ge=0, le=8, description="Number of contacts before this campaign")
    poutcome: POutcome = Field(..., description="Outcome of the previous marketing campaign")
    emp_var_rate: float = Field(-3.4, ge=-3.4, le=1.4, alias="emp.var.rate", description="Employment variation rate")
    cons_price_idx: float = Field(92.0, ge=92.0, le=95.0, alias="cons.price.idx", description="Consumer price index")
    cons_conf_idx: float = Field(-51.0, ge=-51.0, le=-26.0, alias="cons.conf.idx", description="Consumer confidence index")
    euribor3m: float = Field(0.6, ge=0.6, le=5.1, alias="euribor3m", description="Euribor 3-month rate")
    nr_employed: float = Field(4960.0, ge=4960.0, le=5230.0, alias="nr.employed", description="Number of employees in the economy (thousands)")


class ModelMetrics(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1: float
    rocAuc: float


class ModelInfo(BaseModel):
    name: str
    algorithm: str
    library: str
    problemType: str
    target: str
    featuresUsed: int
    trainingSetSize: int
    testSetSize: int
    metrics: ModelMetrics


class ModelInput(BaseModel):
    feature: str
    value: float


class FeatureContribution(BaseModel):
    feature: str
    contribution: float


class PredictionResponse(BaseModel):
    status: Literal["success"]
    prediction: Literal["yes", "no"]
    probability: float
    confidence: float
    probabilities: "dict[str, float]"
    modelUsed: str
    model: ModelInfo
    modelInputs: list[ModelInput]
    featureContributions: list[FeatureContribution]
    topPositiveDrivers: list[str]
    topNegativeDrivers: list[str]
    generatedAt: str