## Endpoints

|      entity      | action | vendor |                                   task                                   |
| :--------------- | :----: | :----: | :----------------------------------------------------------------------- |
| consent          |  GET   | Parse  | update                                                                   |
| contacts         |  GET   | Parse  | filter by any field, within range for dates, paginated, limit 10, sorted |
| contacts         |  GET   | Parse  | filter by last update date                                               |
| contacts         |  GET   | Parse  | matching UID regex, limit 10, sorted                                     |
| contacts         |  POST  | Parse  | create new                                                               |
| contacts         |  PUT   | Parse  | update                                                                   |
| events           |  GET   | Parse  | filter by date (for reports)                                             |
| events → contact |  GET   | Parse  | find all for contact by UUID                                             |
| events → contact |  POST  | Parse  | update 1                                                                 |
| user             | login  | Google | get basic profile                                                        |
| user             | login  | Google | is signed in?                                                            |

## Entities

### User
| Description |  type  |
| :---------: | :----- |
| First Name  | string |
|  Last Name  | string |
|    Email    | string |
|    Role     | string |

### Contacts
|      Description       |  type   |
| :--------------------: | :------ |
|       otherDrugs       | array   |
|  otherDrugsAggregate   | array   |
| ---------------------- | ------- |
|     didOdLastYear      | boolean |
|   hasHealthInsurance   | boolean |
|        hispanic        | boolean |
|       isEnrolled       | boolean |
|    isInCareForHepC     | boolean |
|     isInCareForHiv     | boolean |
| ---------------------- | ------- |
|  ageOfFirstInjection   | date    |
|      dateOfBirth       | date    |
|    dateOfLastVisit     | date    |
| ---------------------- | ------- |
| syringesGivenAggregate | number  |
| syringesTakenAggregate | number  |
| ---------------------- | ------- |
|     countryOfBirth     | string  |
|       ethnicity        | string  |
|     genderIdentity     | string  |
|     healthInsurer      | string  |
|       hepCStatus       | string  |
|       hivStatus        | string  |
|     housingStatus      | string  |
|      primaryDrug       | string  |
|      profileNotes      | string  |
|          uid           | string  |
|        zipCode         | string  |

### Event
|       Description       |   type   |
| :---------------------: | :------- |
|       otherDrugs        | array    |
|        referrals        | array    |
| ----------------------- | -------- |
|      didOdLastYear      | boolean  |
|   hasHealthInsurance    | boolean  |
|        hispanic         | boolean  |
|       isEnrolled        | boolean  |
|     isInCareForHepC     | boolean  |
|     isInCareForHiv      | boolean  |
|       isOutreach        | boolean  |
|    narcanWasOffered     | boolean  |
|     narcanWasTaken      | boolean  |
| ----------------------- | -------- |
|          date           | date     |
|       dateOfBirth       | date     |
|     newContactDate      | date     |
| ----------------------- | -------- |
|  ageOfFirstInjection')  | number   |
| numberOfOthersHelping') | number   |
|      syringesGiven      | number   |
|      syringesTaken      | number   |
| ----------------------- | -------- |
|     uid', 'contacts     | relation |
| ----------------------- | -------- |
|     countryOfBirth      | string   |
|        ethnicity        | string   |
|       eventNotes        | string   |
|     genderIdentity      | string   |
|      healthInsurer      | string   |
|       hepCStatus        | string   |
|        hivStatus        | string   |
|      housingStatus      | string   |
|       primaryDrug       | string   |
|      profileNotes       | string   |
|         zipCode         | string   |

### Consent
| Description  |  type  |
| :----------: | :----- |
| versionMajor | number |
| versionMinor | number |
| versionPatch | number |
|     text     | string |