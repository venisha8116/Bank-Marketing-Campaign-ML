// Real project source of truth: values and findings transcribed from the supplied EDA.ipynb, DataPreprocessing.ipynb and ModelTrainingAndEvaluation.ipynb.
export const datasetInfo = {
  "name": "bank-additional-full.csv",
  "source": "UCI Machine Learning Repository \u2014 Bank Marketing dataset",
  "rawRows": 41188,
  "rawColumns": 21,
  "afterUnknownCleaningRows": 40787,
  "cleanedRows": 40775,
  "rowsRemovedUnknown": 410,
  "rowsRemovedDuplicates": 12,
  "nanMissingValues": 0,
  "rawNumericalFeatures": 10,
  "rawCategoricalFeatures": 10,
  "targetVariable": "y",
  "targetLabels": {
    "negative": "no",
    "positive": "yes"
  },
  "problemType": "Binary Classification",
  "finalFeatureCount": 59
};

export const featureTable = [
  {
    "feature": "age",
    "dataType": "int64",
    "description": "Client age in years",
    "role": "Input (Numerical)"
  },
  {
    "feature": "job",
    "dataType": "object",
    "description": "Type of job",
    "role": "Input (Categorical)"
  },
  {
    "feature": "marital",
    "dataType": "object",
    "description": "Marital status",
    "role": "Input (Categorical)"
  },
  {
    "feature": "education",
    "dataType": "object",
    "description": "Education level",
    "role": "Input (Categorical)"
  },
  {
    "feature": "default",
    "dataType": "object",
    "description": "Has credit in default?",
    "role": "Input (Categorical)"
  },
  {
    "feature": "housing",
    "dataType": "object",
    "description": "Has housing loan?",
    "role": "Input (Categorical)"
  },
  {
    "feature": "loan",
    "dataType": "object",
    "description": "Has personal loan?",
    "role": "Input (Categorical)"
  },
  {
    "feature": "contact",
    "dataType": "object",
    "description": "Contact communication type",
    "role": "Input (Categorical)"
  },
  {
    "feature": "month",
    "dataType": "object",
    "description": "Last contact month of year",
    "role": "Input (Categorical)"
  },
  {
    "feature": "day_of_week",
    "dataType": "object",
    "description": "Last contact day of the week",
    "role": "Input (Categorical)"
  },
  {
    "feature": "duration",
    "dataType": "int64",
    "description": "Last contact duration in seconds; excluded before training because it is only known after the call",
    "role": "Excluded (Leakage)"
  },
  {
    "feature": "campaign",
    "dataType": "int64",
    "description": "Number of contacts performed during this campaign",
    "role": "Input (Numerical)"
  },
  {
    "feature": "pdays",
    "dataType": "int64",
    "description": "Days since the client was last contacted; 999 means not previously contacted",
    "role": "Input (Numerical)"
  },
  {
    "feature": "previous",
    "dataType": "int64",
    "description": "Number of contacts before this campaign",
    "role": "Input (Numerical)"
  },
  {
    "feature": "poutcome",
    "dataType": "object",
    "description": "Outcome of the previous marketing campaign",
    "role": "Input (Categorical)"
  },
  {
    "feature": "emp.var.rate",
    "dataType": "float64",
    "description": "Employment variation rate",
    "role": "Input (Numerical)"
  },
  {
    "feature": "cons.price.idx",
    "dataType": "float64",
    "description": "Consumer price index",
    "role": "Input (Numerical)"
  },
  {
    "feature": "cons.conf.idx",
    "dataType": "float64",
    "description": "Consumer confidence index",
    "role": "Input (Numerical)"
  },
  {
    "feature": "euribor3m",
    "dataType": "float64",
    "description": "Euribor 3-month rate",
    "role": "Input (Numerical)"
  },
  {
    "feature": "nr.employed",
    "dataType": "float64",
    "description": "Number of employees in the economy, in thousands",
    "role": "Input (Numerical)"
  },
  {
    "feature": "y",
    "dataType": "object",
    "description": "Whether the client subscribed to a term deposit",
    "role": "Target"
  }
];

export const projectInfo = {
  "title": "Bank Marketing Campaign Prediction System",
  "problemStatement": "Banks contact customers to promote term deposits. The project uses historical campaign data to study customer and campaign patterns and predict whether a client will subscribe.",
  "objective": "Perform data quality analysis and EDA, train multiple classification models, evaluate them using multiple metrics, and use the selected Naive Bayes model for customer-level prediction.",
  "datasetSource": "UCI Machine Learning Repository \u2014 Bank Marketing dataset (bank-additional-full.csv)",
  "citation": "S. Moro, P. Cortez and P. Rita. A Data-Driven Approach to Predict the Success of Bank Telemarketing. Decision Support Systems (2014).",
  "workflow": [
    "Dataset",
    "Data Cleaning",
    "EDA",
    "Model Training",
    "Model Evaluation",
    "Customer Prediction"
  ],
  "techStack": [
    "Python",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "scikit-learn",
    "React",
    "Vite",
    "Recharts"
  ]
};

export const targetDistribution = [
  {label:'No', value:36548, percentage:88.734583},
  {label:'Yes', value:4640, percentage:11.265417}
];
export const jobDistribution = [
  {
    "job": "admin.",
    "count": 10422
  },
  {
    "job": "blue-collar",
    "count": 9254
  },
  {
    "job": "technician",
    "count": 6743
  },
  {
    "job": "services",
    "count": 3969
  },
  {
    "job": "management",
    "count": 2924
  },
  {
    "job": "retired",
    "count": 1720
  },
  {
    "job": "entrepreneur",
    "count": 1456
  },
  {
    "job": "self-employed",
    "count": 1421
  },
  {
    "job": "housemaid",
    "count": 1060
  },
  {
    "job": "unemployed",
    "count": 1014
  },
  {
    "job": "student",
    "count": 875
  },
  {
    "job": "unknown",
    "count": 330
  }
];
export const contactDistribution = [{type:'cellular',count:26144,percentage:63.47},{type:'telephone',count:15044,percentage:36.53}];
export const monthDistribution = [
  {
    "month": "mar",
    "count": 546
  },
  {
    "month": "apr",
    "count": 2632
  },
  {
    "month": "may",
    "count": 13769
  },
  {
    "month": "jun",
    "count": 5318
  },
  {
    "month": "jul",
    "count": 7174
  },
  {
    "month": "aug",
    "count": 6178
  },
  {
    "month": "sep",
    "count": 570
  },
  {
    "month": "oct",
    "count": 718
  },
  {
    "month": "nov",
    "count": 4101
  },
  {
    "month": "dec",
    "count": 182
  }
];
export const poutcomeDistribution = [{outcome:'nonexistent',count:35563},{outcome:'failure',count:4252},{outcome:'success',count:1373}];

export const edaFindings = [
 'The target is heavily imbalanced: 36,548 customers (88.73%) did not subscribe and 4,640 (11.27%) subscribed.',
 'The EDA identified previous campaign outcome, contact method, month and prior-contact status as strong individual signals for subscription behaviour.',
 'Customers with a previous successful campaign outcome show substantially higher subscription rates than the other previous-outcome groups.',
 'Cellular contact is much more common than telephone contact in the dataset.',
 'emp.var.rate, euribor3m and nr.employed move together strongly, indicating overlapping macro-economic information.',
 'Customers who subscribed had lower average emp.var.rate (-1.233) than non-subscribers (0.249), lower average euribor3m (2.123 vs 3.811), and lower average nr.employed (5095.116 vs 5176.167).',
 'duration was excluded from model training because it is known only after the call and would introduce target leakage.'
];

export const cleaningSummary = [
 {label:'NaN values',value:'0',detail:'No missing NaN values in the raw dataset'},
 {label:'Unknown job rows removed',value:'330',detail:'0.80% of raw records'},
 {label:'Unknown marital rows removed',value:'80',detail:'0.19% of raw records'},
 {label:'Duplicate rows removed',value:'12',detail:'After the unknown-value cleaning step'}
];

export const selectedModel = {
  "name": "Naive Bayes",
  "algorithm": "Gaussian Naive Bayes",
  "library": "scikit-learn (GaussianNB)",
  "problemType": "Binary Classification",
  "target": "y (0 = No, 1 = Yes)",
  "featuresUsed": 59,
  "trainingSetSize": 32620,
  "testSetSize": 8155,
  "hyperparameters": {
    "var_smoothing": 1e-09
  },
  "selectionReason": "Selected in the notebook because the project prioritizes identifying potential subscribers. It achieved the highest recall among the tested models and the lowest number of false negatives in the final confusion-matrix comparison.",
  "accuracy": 0.8083,
  "precision": 0.3201,
  "recall": 0.6235,
  "f1Score": 0.423,
  "aucScore": 0.7715,
  "confusionMatrix": {
    "trueNegative": 6019,
    "falsePositive": 1217,
    "falseNegative": 346,
    "truePositive": 573
  },
  "classificationReport": [
    {
      "class": "0 (No)",
      "precision": 0.95,
      "recall": 0.83,
      "f1": 0.89,
      "support": 7236
    },
    {
      "class": "1 (Yes)",
      "precision": 0.32,
      "recall": 0.62,
      "f1": 0.42,
      "support": 919
    },
    {
      "class": "Macro avg",
      "precision": 0.63,
      "recall": 0.73,
      "f1": 0.65,
      "support": 8155
    },
    {
      "class": "Weighted avg",
      "precision": 0.88,
      "recall": 0.81,
      "f1": 0.83,
      "support": 8155
    }
  ]
};

export const modelComparison = [
  {
    "model": "Logistic Regression",
    "accuracy": 0.9003,
    "precision": 0.684,
    "recall": 0.2144,
    "f1": 0.3264,
    "rocAuc": 0.7973
  },
  {
    "model": "Decision Tree",
    "accuracy": 0.8401,
    "precision": 0.3077,
    "recall": 0.3351,
    "f1": 0.3208,
    "rocAuc": 0.6202
  },
  {
    "model": "Random Forest",
    "accuracy": 0.8974,
    "precision": 0.6005,
    "recall": 0.2666,
    "f1": 0.3693,
    "rocAuc": 0.7957
  },
  {
    "model": "AdaBoost",
    "accuracy": 0.9001,
    "precision": 0.7,
    "recall": 0.198,
    "f1": 0.3087,
    "rocAuc": 0.8038
  },
  {
    "model": "Gradient Boosting",
    "accuracy": 0.8987,
    "precision": 0.626,
    "recall": 0.2514,
    "f1": 0.3587,
    "rocAuc": 0.8093
  },
  {
    "model": "KNN",
    "accuracy": 0.8743,
    "precision": 0.4169,
    "recall": 0.2894,
    "f1": 0.3417,
    "rocAuc": 0.6985
  },
  {
    "model": "Naive Bayes",
    "accuracy": 0.8083,
    "precision": 0.3201,
    "recall": 0.6235,
    "f1": 0.423,
    "rocAuc": 0.7715
  }
];

export const predictionFormSchema = {
  "customerInformation": [
    {
      "name": "age",
      "label": "Age",
      "type": "number",
      "min": 17,
      "max": 98,
      "step": 1
    },
    {
      "name": "job",
      "label": "Job",
      "type": "select",
      "options": [
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
        "unemployed"
      ]
    },
    {
      "name": "marital",
      "label": "Marital Status",
      "type": "select",
      "options": [
        "married",
        "single",
        "divorced"
      ]
    },
    {
      "name": "education",
      "label": "Education",
      "type": "select",
      "options": [
        "basic.4y",
        "basic.6y",
        "basic.9y",
        "high.school",
        "illiterate",
        "professional.course",
        "university.degree",
        "unknown"
      ]
    },
    {
      "name": "default",
      "label": "Has Credit in Default?",
      "type": "select",
      "options": [
        "no",
        "yes",
        "unknown"
      ]
    },
    {
      "name": "housing",
      "label": "Has Housing Loan?",
      "type": "select",
      "options": [
        "no",
        "yes",
        "unknown"
      ]
    },
    {
      "name": "loan",
      "label": "Has Personal Loan?",
      "type": "select",
      "options": [
        "no",
        "yes",
        "unknown"
      ]
    }
  ],
  "campaignInformation": [
    {
      "name": "contact",
      "label": "Contact Communication Type",
      "type": "select",
      "options": [
        "cellular",
        "telephone"
      ]
    },
    {
      "name": "month",
      "label": "Last Contact Month",
      "type": "select",
      "options": [
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
      ]
    },
    {
      "name": "day_of_week",
      "label": "Last Contact Day",
      "type": "select",
      "options": [
        "mon",
        "tue",
        "wed",
        "thu",
        "fri"
      ]
    },
    {
      "name": "campaign",
      "label": "Contacts This Campaign",
      "type": "number",
      "min": 1,
      "max": 60,
      "step": 1
    }
  ],
  "previousCampaignInformation": [
    {
      "name": "pdays",
      "label": "Days Since Last Contact",
      "type": "number",
      "min": 0,
      "max": 999,
      "step": 1
    },
    {
      "name": "previous",
      "label": "Previous Contacts",
      "type": "number",
      "min": 0,
      "max": 8,
      "step": 1
    },
    {
      "name": "poutcome",
      "label": "Previous Campaign Outcome",
      "type": "select",
      "options": [
        "nonexistent",
        "failure",
        "success"
      ]
    }
  ],
  "economicContext": [
    {
      "name": "emp.var.rate",
      "label": "Employment Variation Rate",
      "type": "number",
      "min": -3.4,
      "max": 1.4,
      "step": 0.1
    },
    {
      "name": "cons.price.idx",
      "label": "Consumer Price Index",
      "type": "number",
      "min": 92,
      "max": 95,
      "step": 0.01
    },
    {
      "name": "cons.conf.idx",
      "label": "Consumer Confidence Index",
      "type": "number",
      "min": -51,
      "max": -26,
      "step": 0.1
    },
    {
      "name": "euribor3m",
      "label": "Euribor 3-Month Rate",
      "type": "number",
      "min": 0.6,
      "max": 5.1,
      "step": 0.001
    },
    {
      "name": "nr.employed",
      "label": "Number of Employees",
      "type": "number",
      "min": 4960,
      "max": 5230,
      "step": 0.1
    }
  ]
};

export const pipelineStages = [
 {key:'dataset',label:'Bank Marketing Dataset',status:'complete',detail:'41,188 records, 21 columns'},
 {key:'cleaning',label:'Data Cleaning',status:'complete',detail:'40,775 records after cleaning'},
 {key:'preprocessing',label:'Feature Preparation',status:'complete',detail:'59 model features; duration excluded'},
 {key:'eda',label:'EDA',status:'complete',detail:'Target, customer, campaign and economic analysis'},
 {key:'training',label:'Model Training',status:'complete',detail:'Gaussian Naive Bayes'},
 {key:'evaluation',label:'Model Evaluation',status:'complete',detail:'Recall 62.35%, ROC-AUC 0.7715'},
 {key:'prediction',label:'Customer Prediction',status:'active',detail:'Run a real Naive Bayes prediction'}
];

export const naiveBayesParameters = {"classes":[0,1],"classPrior":[0.8873697118332311,0.11263028816676886],"epsilon":1.0000000000000003e-09,"features":["age","contact","campaign","pdays","previous","emp.var.rate","cons.price.idx","cons.conf.idx","euribor3m","nr.employed","job_admin.","job_blue-collar","job_entrepreneur","job_housemaid","job_management","job_retired","job_self-employed","job_services","job_student","job_technician","job_unemployed","marital_divorced","marital_married","marital_single","education_basic.4y","education_basic.6y","education_basic.9y","education_high.school","education_illiterate","education_professional.course","education_university.degree","education_unknown","default_no","default_unknown","default_yes","housing_no","housing_unknown","housing_yes","loan_no","loan_unknown","loan_yes","month_apr","month_aug","month_dec","month_jul","month_jun","month_mar","month_may","month_nov","month_oct","month_sep","day_of_week_fri","day_of_week_mon","day_of_week_thu","day_of_week_tue","day_of_week_wed","poutcome_failure","poutcome_nonexistent","poutcome_success"],"theta":[[-0.011445851116889368,0.6108961514544324,0.024288556099569973,0.11716369848037123,-0.08199662091581139,0.1052390575911261,0.04761866697045618,-0.019902220239127546,0.10872972883096921,0.12553313843515837,0.24963725557935465,0.23747668071581565,0.037069025081185654,0.026463069163269536,0.07185794237545774,0.035376217784840736,0.03433980515442548,0.10087749602708491,0.017135355489532232,0.1655841912526774,0.024182961376355974,0.11365991846887308,0.6120707524355696,0.27426932909555723,0.10212119118358322,0.05634630000690942,0.15477095280867822,0.23267463552822498,0.00044911213984661095,0.127444206453396,0.289470047674981,0.036723554204380573,0.7796241276860361,0.22027223105092242,0.0001036412630415256,0.4558488219443101,0.024321149727078006,0.5198300283286119,0.8233952877772404,0.024321149727078006,0.15228356249568162,0.05731361846196366,0.15114350860222484,0.00259103157603814,0.1789193670973537,0.13020797346783666,0.007151247149865266,0.3517584467629379,0.10136115525461203,0.010951426794721206,0.008602224832446624,0.19284184343259864,0.20786982657361985,0.20748980860913424,0.19519104539487322,0.19660747598977407,0.10132660816693152,0.8855454985144753,0.013127893318593242],[0.09017735613214342,0.8271638541099618,-0.1913599741039914,-0.9230866674498792,0.6460191042536723,-0.829137115142267,-0.37516873547257307,0.1568017602182374,-0.8566387399949614,-0.9890261908397379,0.2904191616766467,0.13745236799129015,0.028579205225911813,0.022591181273816003,0.07294501905280348,0.09635274904735983,0.031028851388132824,0.07376156777354383,0.06096897114861187,0.15514425694066414,0.030756668481219378,0.1050626020685901,0.5449101796407185,0.35002721829069133,0.09335873707131193,0.041916167664670656,0.10179640718562874,0.22074033750680458,0.0008165487207403375,0.1271094175285792,0.3598258029395754,0.05443658138268917,0.9063690800217746,0.09363091997822537,0.0,0.4357648339684268,0.02231899836690256,0.5419161676646707,0.829613500272183,0.02231899836690256,0.14806750136091454,0.11676646706586827,0.1390854654327708,0.01905280348394121,0.14153511159499182,0.11867174741426238,0.06260206859009254,0.19488296135002722,0.08791507893304301,0.0658682634730539,0.05362003266194883,0.18372346216657595,0.18807838867719107,0.22237343494828524,0.20577027762656505,0.2000544365813827,0.1276537833424061,0.675830157866086,0.19651605879150788]],"var":[[0.9009935473310791,0.23770204459261476,1.0773088653097291,0.41644113883118206,0.6808709060215752,0.8934338283799477,0.9353550552109003,0.9016305355981667,0.8936078824859048,0.8011294918056078,0.18731849720610283,0.18108150783202234,0.03569491346073207,0.025762776133730375,0.06669437949302202,0.034124742000090615,0.03316058393639949,0.09070122782242686,0.01684173608178725,0.13816606785983088,0.02359814675543455,0.10074134240255958,0.2374401474484793,0.19904566521300046,0.09169245449484181,0.05317139548244656,0.1308169059753666,0.178537150510087,0.0004489114381326879,0.11120218169484827,0.20567714017405678,0.03537493577099713,0.1718103482157737,0.1717523762786928,0.00010363152153007231,0.24805067447628465,0.023729632403037028,0.24960677097658687,0.1454154888435205,0.023729632403037028,0.12909328008923926,0.054028768600778265,0.12829914940966908,0.0025843191314104436,0.14690722817489407,0.113253858113205,0.007100107814061711,0.22802444289390425,0.09108707246006205,0.010831494045881889,0.008528227560374172,0.15565386785413735,0.1646599627739044,0.16443778893237904,0.15709150219252527,0.1579529773746962,0.0910595276443564,0.10135466957525222,0.01295555273560633],[1.7708687706944806,0.14296381356391627,0.34964738889863806,4.637389357383165,3.043980471969992,1.0648669688143086,1.3506954709937655,1.7473068078186713,1.0112496005708975,1.4644941042904922,0.2060758732076747,0.11855921552488076,0.027762435254565968,0.022080820802469234,0.06762404424818595,0.08706889779837745,0.03006606276966763,0.06832079989313529,0.05725175670569009,0.1310745174790047,0.02981069682515736,0.09402445271516892,0.24798307676463877,0.2275081657463695,0.08464288428376485,0.04015920355297994,0.09143389966972837,0.17201404190418576,0.0008158829689269722,0.11095261450412043,0.23035119547848013,0.05147324099005652,0.08486417180225478,0.08486417180225478,1.0000000000000003e-09,0.24587384444489538,0.02182086167880096,0.24824303588829738,0.1413549414383126,0.02182086167880096,0.1261435174016429,0.10313206023481784,0.11974069973811498,0.018689795163341405,0.12150292478077886,0.10458876477990652,0.058683050598329345,0.15690359372547624,0.08018601882924613,0.061529636340098795,0.050744925759279524,0.14996915261610447,0.15270490938978654,0.17292349137759525,0.16342887147205537,0.160032659985485,0.11135829594077253,0.21908375658478932,0.15789749842856057]],"scalerFeatures":["age","campaign","pdays","previous","emp.var.rate","cons.price.idx","cons.conf.idx","euribor3m","nr.employed"],"scalerMean":[39.96729000613121,2.567719190680564,961.6805947271613,0.17492335990190067,0.07870018393623544,93.5744649294911,-40.51877988963826,3.616435775597793,5166.930588595954],"scalerScale":[10.437836919576453,2.760518084576232,188.84963420227803,0.49645855900499075,1.5709297829077062,0.5785936933221425,4.623928299581337,1.7359003368141908,72.29930033054471]};
