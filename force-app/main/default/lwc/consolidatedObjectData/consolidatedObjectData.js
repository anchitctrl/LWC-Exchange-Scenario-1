import { LightningElement, track } from "lwc";
import getOpportunityData from "@salesforce/apex/getObjectData.getOpportunityData";
import getAccountData from "@salesforce/apex/getObjectData.getAccountData";
import getCaseData from "@salesforce/apex/getObjectData.getCaseData";

const opportunityColumns = [
    {label:'Opportunity Name',fieldName: 'nameUrl', type: 'url',typeAttributes: {label: { fieldName: 'Name' },target: '_blank'},sortable:true},
    {label:'Account Name',fieldName: 'Account', type: 'url',typeAttributes: {label: { fieldName: 'AccountName' },target: '_blank'},sortable:true},
    {label:'Stage Name',fieldName:'StageName',type:'text',sortable:true},
    {label:'Amount',fieldName:'Amount',type:'text',sortable:true},
    {label:'Type',fieldName:'Type',type:'text',sortable:true},
];

const accountColumns = [
    {label:'Name',fieldName: 'nameUrl', type: 'url',typeAttributes: {label: { fieldName: 'Name' },target: '_blank'},sortable:true},
    {label:'Phone',fieldName:'Phone'},
    {label:'Billing City ',fieldName:'BillingCity'},
];

const caseColumns = [
    {label:'Case Number',fieldName: 'nameUrl', type: 'url',typeAttributes: {label: { fieldName: 'CaseNumber' },target: '_blank'},sortable:true},
    {label:'Related Account Name',fieldName:'Account', type: 'url',typeAttributes: {label: { fieldName: 'AccountName' },target: '_blank'},sortable:true},
    {label:'Case Subject',fieldName:'Subject'},
    {label:'Case Owner Name',fieldName:'OwnerName'},
];

export default class ConsolidatedObjectData extends LightningElement {
	
    @track opportunityData;
    @track accountData;
    @track caseData;
    opportunityColumns = opportunityColumns;
    accountColumns = accountColumns;
    caseColumns = caseColumns;
    opportunityHeader = ['Opportunity Name', 'Account Name', 'Stage Name', 'Amount', 'Type' ];
    accountHeader = ['Name', 'Phone', 'Billing City'];
    caseHeader = ['Case Number', 'Related Account Name', 'Case Subject', 'Case Owner Name'];
    Header;
    Data;
    FileName;
    activeTab;

    connectedCallback() {
		try{
            getOpportunityData({})
			.then((result) => {
                this.opportunityData = result;
			})
			.catch((error) => {
                console.log('Error in getOpportunityData');
				console.log(JSON.stringify(error));
			});

		    getAccountData({})
			.then((result) => {
                this.accountData = result;
			})
			.catch((error) => {
                console.log('Error in getAccountData');
				console.log(JSON.stringify(error));
			});

		    getCaseData({})
			.then((result) => {
                this.caseData = result;
			})
			.catch((error) => {
                console.log('Error in getCaseData');
				console.log(JSON.stringify(error));
			});
        }catch(e){
            console.log('Error in ConnectedCallback');
            console.log(e.message);
        }
	}
    
    handleDownloadData(){
        try{
            if(this.activeTab == 'opportunity'){
                this.Header = this.opportunityHeader;
                this.Data = this.opportunityData;
                this.FileName = 'Opportunity Data.xls';
            }else if(this.activeTab == 'account'){
                this.Header = this.accountHeader;
                this.Data = this.accountData;
                this.FileName = 'Account Data.xls';
            }else if(this.activeTab == 'case'){
                this.Header = this.caseHeader;
                this.Data = this.caseData;
                this.FileName = 'Case Data.xls';
            }
            let doc = '<table>';
            doc += '<style>';
            doc += 'table, th, td {';
            doc += '    border: 1px solid black;';
            doc += '    border-collapse: collapse;';
            doc += '}';          
            doc += '</style>';
            doc += '<tr>';
            this.Header.forEach(element => {            
                doc += '<th>'+ element +'</th>'           
            });
            doc += '</tr>';
            if(this.activeTab == 'opportunity'){
                this.Data.forEach(record => {
                    doc += '<tr>';
                    doc += '<th>'+record.Name+'</th>'; 
                    doc += '<th>'+record.AccountName+'</th>'; 
                    doc += '<th>'+record.StageName+'</th>';
                    doc += '<th>'+record.Amount+'</th>';
                    doc += '<th>'+record.Type+'</th>';
                    doc += '</tr>';
                });
            }else if(this.activeTab == 'account'){
                this.Data.forEach(record => {
                    doc += '<tr>';
                    doc += '<th>'+record.Name+'</th>'; 
                    doc += '<th>'+record.Phone+'</th>'; 
                    doc += '<th>'+record.BillingCity+'</th>';
                    doc += '</tr>';
                });
            }else if(this.activeTab == 'case'){
                this.Data.forEach(record => {
                    doc += '<tr>';
                    doc += '<th>'+record.CaseNumber+'</th>'; 
                    doc += '<th>'+record.AccountName+'</th>'; 
                    doc += '<th>'+record.Subject+'</th>';
                    doc += '<th>'+record.OwnerName+'</th>';
                    doc += '</tr>';
                });
            }
            doc += '</table>';
            var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
            let downloadElement = document.createElement('a');
            downloadElement.href = element;
            downloadElement.target = '_self';
            downloadElement.download = this.FileName;
            document.body.appendChild(downloadElement);
            downloadElement.click();
        }catch(e){
            console.log('Catch of handleDownloadData');
            console.log(e.message);
        }
    }

    handleActive(event){
        try{
            this.activeTab =  event.target.value;
        }catch(e){
            console.log('Error in activeTab');
            console.log(e.message);
        }
    }
}