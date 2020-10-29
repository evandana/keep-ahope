# How to Setup Azure

- Official [Microsoft Azure Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-overview)
    - Follow instructions for setting up MSAL 2.0 for a Single-page application
        - Sample: https://github.com/Azure-Samples/ms-identity-javascript-v2
    - Use "Implict Grant Flow" because it's a SPA
        - [Security considerations](The provided value for the input parameter 'response_type' is not allowed for this client. Expected value is 'code'. 'token' is disabled for this app.)
    - SSO: Find instructions there

Sample Apps & Template Codebases
- BE Template: [Serverless REST API with Azure Functions, Node and Azure SQL](https://docs.microsoft.com/en-us/samples/azure-samples/azure-sql-db-node-rest-api/azure-sql-db-node-rest-api/)
    - BE Auth token pattern: [Todo Backend Implementation with Azure Functions, Node and Azure SQL](https://docs.microsoft.com/en-us/samples/azure-samples/azure-sql-db-todo-backend-func-node/azure-sql-db-todo-backend-func-node/)
- FE Sign in and auth pattern: [Single-Page Application built on MSAL.js with Azure AD B2C](https://docs.microsoft.com/en-us/samples/azure-samples/active-directory-b2c-javascript-msal-singlepageapp/active-directory-b2c-javascript-msal-singlepageapp/)

Tutorials
- [Develop Azure Functions using Visual Studio](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs)
- [Code and test Azure Functions locally](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local)
- [Deploy Azure Functions from Visual Studio Code](https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial-vscode-serverless-node-01?tabs=bash)




## Questions

Mention general nature of the app

Aaron: Demand Response team
- Azure for Non-Profits

- evan.writes.code@gmail.com

1. How to ensure proper HIPAA setup? (encryption at rest and in transit)
    - 100% HIPAA compliant
    - [ ] Aaron to send BAA
1. Can I transfer ownership of a Registration later on?
1. Will be transferring to org with Azure SSO. What do I need to do to simplify that?
    - [ ] BPHC to create an Azure subscription for me
    - [ ] Then recreate the registrations
1. Extend the free month?
    - [ ] Aaron to extend for evan.dana@gmail.com
1. Charity/Philanthropic pricing?
    - Azure for Non-Profits
        - [ ] Register it as a non-profit
    - [ ] Aaron will send the questionnaire
1. Can I use the node WebApp or do I need an API app template (only ASP.NET provided)?
1. Expected maintenance time per year? (Security updates)
    - Azure App Service: 99.95% availability
    - 30-90 days before problems
    - [ ] Aaron to get the hisorical info here
1. Contractor option
    - Microsoft Partner Network
    - Microsoft can't know their hourly rates
    - [ ] Aaron to provide info on this
1. Role-based access controls
    - ? is it Optional Claim to connect that?
    - [ ] Aaron to send info to Evan on this
1. Support offerings?
    - Includes architecture and response time sliding scales based on severity
    - Basic support plans (free, slow response time)
    - Developer: $30/mo
    - Standard: $100/mo


