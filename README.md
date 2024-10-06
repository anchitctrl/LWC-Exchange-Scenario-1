In this LWC scenario, We are going to learn building complex Lightning Data table, Calling Apex Class, Using Lightning Tabset and Tabs, showing toast, handling errors etc.

This problem statement has been designed for developer who has very good understanding in Lightning Web Component.

Business want to see a consolidated view of pending approvals along with related record fields info. Standard Salesforce report and dashboard does not allows us to add related record object fields.

Technical Architect suggested to write a Lightning Web Component with these features:-

It should tab set to display approval records categorized based on related object
Current Implementation has approval process on Opportunity, Account and Case
Each row in data table should show approval step with pending status
Opportunity Tab in tab set should show Stage, Amount & Type columns along with approval object fields column
Account Tab in tab set should show Account Name, Email & Billing City columns along with approval object fields column
Case Tab in tab set should show Subject, Related Account & Owner columns along with approval object fields column
Business also wants to download the pending approval records as CSV file. Hence, We also require a download button in Lightning Web Component.

![image](https://github.com/user-attachments/assets/bb7606d6-a8bb-49f9-9ea8-0b40446a9174)


# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
