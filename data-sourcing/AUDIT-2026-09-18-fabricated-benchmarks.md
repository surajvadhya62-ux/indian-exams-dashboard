# Audit — fabricated competition benchmarks (2026-09-18)

**Finding:** 170 of 500 exams carried a `competition_benchmarks` row that was generated
from a fixed ratio rather than taken from any notification, while being marked
`confidence: "verified"`. Because the site renders a source badge whenever confidence is
`verified`, these figures were displayed to students with an assertion that they had been
checked against an official source. They had not.

## How they were identified

Every one of the 170 rows matched all four conditions simultaneously:

| Field | Value |
|---|---|
| `applicants` | exactly `vacancies x 185` |
| `selectivity_ratio` | the literal string `"approx. 1 in 185"` |
| `as_of` | `2025-09-01` |
| `confidence` | `verified` |

The applicant counts were therefore not observations at all — they were the vacancy
figure multiplied by a constant. `source_label` followed the template
`"<body> - Statutory Recruitment Cycle Notification"` and `source_url` pointed at the
body's homepage rather than any document.

Only ten distinct vacancy values were spread across all 170 exams:

| Exams | Vacancy figure used |
|---|---|
| 92 | 650 |
| 27 | 950 |
| 16 | 480 |
| 11 | 4200 |
| 7 | 1100 |
| 6 | 540 |
| 5 | 8500 |
| 3 | 2400 |
| 2 | 1800 |
| 1 | 3200 |

The 650 group overlaps the same `"650 Posts"` default that was found in
`src/data/exams.json` — the same defect had been written into both layers.

Some rows were category errors as well as fabrications: **AIBE** (a pass/fail bar
examination with no vacancies) and **ACET** (an actuarial entrance exam) were both given
650 vacancies and 120,250 applicants.

## What was done

The 170 rows were **removed** rather than downgraded. The schema's confidence enum
(`verified` | `reported` | `estimate`) has no value weak enough to hold a fabricated
figure, and a downgraded row would still have displayed the number. 168 dossiers retain
genuine rows for other years; 2 were left with no rows and their section set to
`not_available` with an explanatory note.

Verified rows across the corpus: **628 before, 458 after.**

## What was NOT established

The remaining 458 verified rows showed no generation pattern: scattered document-era
dates, no constant ratio, and specific working notes. Their other sections
(`career_ladder`, `exam_scheme`, `financial_package`) showed zero cross-exam duplication.

That is analytical assurance, not substantive verification. It rules out *generated*
data; it does not confirm any individual figure is correct. Each remains unconfirmed
until someone opens its source.

## Affected exams

- `aai-junior-executive-common` (year 2025): removed 650 vacancies / 120250 applicants
- `acet-actuarial` (year 2025): removed 650 vacancies / 120250 applicants
- `aibe` (year 2025): removed 650 vacancies / 120250 applicants
- `ap-grama-sachivalayam` (year 2025): removed 650 vacancies / 120250 applicants
- `ap-slprb-constable` (year 2025): removed 4200 vacancies / 777000 applicants
- `ap-slprb-si` (year 2025): removed 950 vacancies / 175750 applicants
- `appsc-group-4` (year 2025): removed 480 vacancies / 88800 applicants
- `aptransco-assistant-engineer` (year 2025): removed 950 vacancies / 175750 applicants
- `arunachal-tet` (year 2025): removed 8500 vacancies / 1572500 applicants
- `asrb-icar-administrative-officer` (year 2025): removed 650 vacancies / 120250 applicants
- `assam-rifles-technical-tradesmen` (year 2025): removed 540 vacancies / 99900 applicants
- `barc-stipendiary-trainee` (year 2025): removed 650 vacancies / 120250 applicants
- `beml-management-trainee` (year 2025): removed 650 vacancies / 120250 applicants
- `bescom-assistant-engineer` (year 2025): removed 950 vacancies / 175750 applicants
- `bhel-artisan` (year 2025): removed 650 vacancies / 120250 applicants
- `bhel-finance-executive` (year 2025): removed 650 vacancies / 120250 applicants
- `bihar-pcs-j` (year 2025): removed 650 vacancies / 120250 applicants
- `bis-scientist-b` (year 2025): removed 650 vacancies / 120250 applicants
- `bis-technical-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `bsf-head-constable-ro` (year 2025): removed 4200 vacancies / 777000 applicants
- `bssc-inter-level` (year 2025): removed 650 vacancies / 120250 applicants
- `bssc-stenographer` (year 2025): removed 650 vacancies / 120250 applicants
- `central-silk-board-scientist` (year 2025): removed 950 vacancies / 175750 applicants
- `cghs-pharmacist` (year 2025): removed 650 vacancies / 120250 applicants
- `cgtet` (year 2025): removed 8500 vacancies / 1572500 applicants
- `cisf-head-constable-ministerial` (year 2025): removed 4200 vacancies / 777000 applicants
- `coffee-board-extension-officer` (year 2025): removed 950 vacancies / 175750 applicants
- `crpf-head-constable-ministerial` (year 2025): removed 4200 vacancies / 777000 applicants
- `csphcl-line-attendant` (year 2025): removed 650 vacancies / 120250 applicants
- `delhi-dhjs` (year 2025): removed 650 vacancies / 120250 applicants
- `delhi-djs` (year 2025): removed 650 vacancies / 120250 applicants
- `delhi-hc-sja` (year 2025): removed 650 vacancies / 120250 applicants
- `dghs-safdarjung-nurse` (year 2025): removed 1800 vacancies / 333000 applicants
- `dmrc-je-sc` (year 2025): removed 1100 vacancies / 203500 applicants
- `dnb-pdcet` (year 2025): removed 650 vacancies / 120250 applicants
- `drdo-ceptam-sta-b` (year 2025): removed 650 vacancies / 120250 applicants
- `drdo-ceptam-tech-a` (year 2025): removed 650 vacancies / 120250 applicants
- `drdo-ceptam` (year 2025): removed 650 vacancies / 120250 applicants
- `drdo-set` (year 2025): removed 650 vacancies / 120250 applicants
- `dsssb-special-educator` (year 2025): removed 650 vacancies / 120250 applicants
- `epfo-ssa` (year 2025): removed 650 vacancies / 120250 applicants
- `esic-paramedical` (year 2025): removed 950 vacancies / 175750 applicants
- `esic-sso` (year 2025): removed 950 vacancies / 175750 applicants
- `fssai-cfso` (year 2025): removed 650 vacancies / 120250 applicants
- `fssai-technical-officer` (year 2025): removed 650 vacancies / 120250 applicants
- `gsi-driver-mechanic` (year 2025): removed 950 vacancies / 175750 applicants
- `gsssb-talati-mantri` (year 2025): removed 650 vacancies / 120250 applicants
- `hal-management-trainee` (year 2025): removed 540 vacancies / 99900 applicants
- `haryana-police-si` (year 2025): removed 4200 vacancies / 777000 applicants
- `hssc-canal-patwari` (year 2025): removed 650 vacancies / 120250 applicants
- `hssc-cet-group-d` (year 2025): removed 650 vacancies / 120250 applicants
- `hssc-clerk` (year 2025): removed 2400 vacancies / 444000 applicants
- `hssc-gram-sachiv` (year 2025): removed 650 vacancies / 120250 applicants
- `htet` (year 2025): removed 8500 vacancies / 1572500 applicants
- `hvpn-assistant-engineer` (year 2025): removed 950 vacancies / 175750 applicants
- `iaf-civilian-group-c` (year 2025): removed 480 vacancies / 88800 applicants
- `ib-acio` (year 2025): removed 540 vacancies / 99900 applicants
- `icar-iari-technician` (year 2025): removed 650 vacancies / 120250 applicants
- `icfre-technical-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `india-post-mts-postman` (year 2025): removed 650 vacancies / 120250 applicants
- `indian-navy-chargeman` (year 2025): removed 650 vacancies / 120250 applicants
- `indian-navy-incet-tradesman` (year 2025): removed 540 vacancies / 99900 applicants
- `iocl-apprentice` (year 2025): removed 650 vacancies / 120250 applicants
- `iocl-finance-officer` (year 2025): removed 650 vacancies / 120250 applicants
- `irfc-executive` (year 2025): removed 650 vacancies / 120250 applicants
- `isro-scientist` (year 2025): removed 650 vacancies / 120250 applicants
- `jipmer-nursing-officer` (year 2025): removed 950 vacancies / 175750 applicants
- `jk-judicial-service` (year 2025): removed 650 vacancies / 120250 applicants
- `jkpsc-kas` (year 2025): removed 480 vacancies / 88800 applicants
- `jkssb-junior-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `jkssb-panchayat-secretary` (year 2025): removed 650 vacancies / 120250 applicants
- `jssc-excise-constable` (year 2025): removed 4200 vacancies / 777000 applicants
- `karnataka-judicial-service` (year 2025): removed 650 vacancies / 120250 applicants
- `kerala-psc-civil-excise` (year 2025): removed 480 vacancies / 88800 applicants
- `kerala-psc-cpo` (year 2025): removed 480 vacancies / 88800 applicants
- `kerala-psc-fireman` (year 2025): removed 480 vacancies / 88800 applicants
- `kerala-psc-ldc` (year 2025): removed 480 vacancies / 88800 applicants
- `kerala-psc-si` (year 2025): removed 950 vacancies / 175750 applicants
- `kerala-psc-vfa` (year 2025): removed 480 vacancies / 88800 applicants
- `kiocl-get` (year 2025): removed 650 vacancies / 120250 applicants
- `kpsc-fda` (year 2025): removed 480 vacancies / 88800 applicants
- `kpsc-sda` (year 2025): removed 480 vacancies / 88800 applicants
- `kptcl-junior-engineer` (year 2025): removed 1100 vacancies / 203500 applicants
- `kvpy` (year 2025): removed 650 vacancies / 120250 applicants
- `kvs-pgt-tgt` (year 2025): removed 650 vacancies / 120250 applicants
- `lic-aao` (year 2025): removed 650 vacancies / 120250 applicants
- `lic-ado` (year 2025): removed 650 vacancies / 120250 applicants
- `lic-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `maha-krishi-sevak` (year 2025): removed 650 vacancies / 120250 applicants
- `maha-talathi` (year 2025): removed 650 vacancies / 120250 applicants
- `maha-vanrakshak` (year 2025): removed 650 vacancies / 120250 applicants
- `mahatransco-assistant-engineer` (year 2025): removed 950 vacancies / 175750 applicants
- `mecl-geologist-engineer` (year 2025): removed 1100 vacancies / 203500 applicants
- `mes-supervisor-barrack-store` (year 2025): removed 650 vacancies / 120250 applicants
- `midhani-management-trainee` (year 2025): removed 650 vacancies / 120250 applicants
- `mp-judicial-service` (year 2025): removed 650 vacancies / 120250 applicants
- `mpsc-manipur-cce` (year 2025): removed 480 vacancies / 88800 applicants
- `nabard-development-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `nbe-fet` (year 2025): removed 650 vacancies / 120250 applicants
- `neet-ss` (year 2025): removed 650 vacancies / 120250 applicants
- `nhpc-trainee-engineer` (year 2025): removed 1100 vacancies / 203500 applicants
- `nia-si-inspector` (year 2025): removed 950 vacancies / 175750 applicants
- `nielit-scientist-b` (year 2025): removed 650 vacancies / 120250 applicants
- `nmdc-maintenance-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `ntse` (year 2025): removed 650 vacancies / 120250 applicants
- `nvs-tgt-pgt` (year 2025): removed 650 vacancies / 120250 applicants
- `ongc-finance-officer` (year 2025): removed 650 vacancies / 120250 applicants
- `oprb-police-si` (year 2025): removed 4200 vacancies / 777000 applicants
- `opsc-oas` (year 2025): removed 480 vacancies / 88800 applicants
- `osssc-mphw` (year 2025): removed 650 vacancies / 120250 applicants
- `osssc-peo` (year 2025): removed 650 vacancies / 120250 applicants
- `pgimer-nursing-officer` (year 2025): removed 950 vacancies / 175750 applicants
- `psssb-clerk` (year 2025): removed 2400 vacancies / 444000 applicants
- `puducherry-udc` (year 2025): removed 650 vacancies / 120250 applicants
- `punjab-judicial-service` (year 2025): removed 650 vacancies / 120250 applicants
- `punjab-police-si` (year 2025): removed 4200 vacancies / 777000 applicants
- `rajasthan-police-constable` (year 2025): removed 4200 vacancies / 777000 applicants
- `rajasthan-police-si` (year 2025): removed 4200 vacancies / 777000 applicants
- `rbi-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `rbi-office-attendant` (year 2025): removed 3200 vacancies / 592000 applicants
- `reet` (year 2025): removed 650 vacancies / 120250 applicants
- `rpsc-ras` (year 2025): removed 480 vacancies / 88800 applicants
- `rrb-group-d` (year 2025): removed 650 vacancies / 120250 applicants
- `rrb-sse` (year 2025): removed 650 vacancies / 120250 applicants
- `rsmssb-agriculture-supervisor` (year 2025): removed 650 vacancies / 120250 applicants
- `rsmssb-informatics-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `rsmssb-junior-accountant` (year 2025): removed 650 vacancies / 120250 applicants
- `rsmssb-lab-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `rsmssb-patwari` (year 2025): removed 650 vacancies / 120250 applicants
- `rsmssb-sanganak` (year 2025): removed 650 vacancies / 120250 applicants
- `rsmssb-vdo` (year 2025): removed 650 vacancies / 120250 applicants
- `sail-act-oct` (year 2025): removed 650 vacancies / 120250 applicants
- `sbi-clerk` (year 2025): removed 2400 vacancies / 444000 applicants
- `sci-jca` (year 2025): removed 650 vacancies / 120250 applicants
- `sidbi-grade-a` (year 2025): removed 950 vacancies / 175750 applicants
- `sjvn-field-engineer` (year 2025): removed 1100 vacancies / 203500 applicants
- `spices-board-field-officer` (year 2025): removed 650 vacancies / 120250 applicants
- `spmcil-junior-office-associate` (year 2025): removed 650 vacancies / 120250 applicants
- `ssc-cgl-aao` (year 2025): removed 650 vacancies / 120250 applicants
- `tea-board-development-officer` (year 2025): removed 650 vacancies / 120250 applicants
- `telangana-forest-fbo` (year 2025): removed 650 vacancies / 120250 applicants
- `thdc-engineer-trainee` (year 2025): removed 1100 vacancies / 203500 applicants
- `tn-judicial-service` (year 2025): removed 650 vacancies / 120250 applicants
- `tn-mrb-staff-nurse` (year 2025): removed 1800 vacancies / 333000 applicants
- `tpsc-cce` (year 2025): removed 480 vacancies / 88800 applicants
- `tpsc-tcs` (year 2025): removed 480 vacancies / 88800 applicants
- `tspsc-group-4` (year 2025): removed 480 vacancies / 88800 applicants
- `tsspdcl-junior-lineman` (year 2025): removed 650 vacancies / 120250 applicants
- `uk-judicial-service` (year 2025): removed 650 vacancies / 120250 applicants
- `uksssc-graduate-level` (year 2025): removed 650 vacancies / 120250 applicants
- `up-pcs-j` (year 2025): removed 650 vacancies / 120250 applicants
- `upcet` (year 2025): removed 650 vacancies / 120250 applicants
- `uppcl-executive-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `uppcl-junior-engineer` (year 2025): removed 1100 vacancies / 203500 applicants
- `upprpb-jail-warder` (year 2025): removed 540 vacancies / 99900 applicants
- `upprpb-radio-operator` (year 2025): removed 540 vacancies / 99900 applicants
- `upsssc-aso` (year 2025): removed 650 vacancies / 120250 applicants
- `upsssc-forest-guard` (year 2025): removed 650 vacancies / 120250 applicants
- `upsssc-junior-assistant` (year 2025): removed 950 vacancies / 175750 applicants
- `upsssc-lekhpal` (year 2025): removed 650 vacancies / 120250 applicants
- `upsssc-pet` (year 2025): removed 650 vacancies / 120250 applicants
- `upsssc-supply-inspector` (year 2025): removed 650 vacancies / 120250 applicants
- `upsssc-tubewell-operator` (year 2025): removed 650 vacancies / 120250 applicants
- `upsssc-vdo` (year 2025): removed 650 vacancies / 120250 applicants
- `uptet` (year 2025): removed 8500 vacancies / 1572500 applicants
- `wb-wbjs` (year 2025): removed 650 vacancies / 120250 applicants
- `wbcs` (year 2025): removed 650 vacancies / 120250 applicants
- `wbprb-excise-constable` (year 2025): removed 4200 vacancies / 777000 applicants
- `wbprb-kolkata-si` (year 2025): removed 950 vacancies / 175750 applicants
- `wbtet` (year 2025): removed 8500 vacancies / 1572500 applicants
