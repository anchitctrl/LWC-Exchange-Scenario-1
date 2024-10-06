public without sharing class getObjectData {
    
    public class OpportunityWrapper{
        @AuraEnabled public String Name;
        @AuraEnabled public String nameUrl;
        @AuraEnabled public String Account;
        @AuraEnabled public String AccountName;
        @AuraEnabled public String StageName;
        @AuraEnabled public Decimal Amount;
        @AuraEnabled public String Type;
    }

    public class AccountWrapper{
        @AuraEnabled public String Name;
        @AuraEnabled public String nameUrl;
        @AuraEnabled public String Phone;
        @AuraEnabled public String BillingCity;
    }

    public class CaseWrapper{
        @AuraEnabled public String CaseNumber;
        @AuraEnabled public String nameUrl;
        @AuraEnabled public String Account;
        @AuraEnabled public String AccountName;
        @AuraEnabled public String Subject;
        @AuraEnabled public String OwnerName;
    }

    @AuraEnabled(cacheable=true)
    public static List<OpportunityWrapper> getOpportunityData(){
        try {
            List<OpportunityWrapper> oppWrapper = new List<OpportunityWrapper>();
            for(Opportunity oppItem:[SELECT Id, AccountId, Account.Name, Name, StageName, Amount, Type from Opportunity where StageName != 'Closed Won']){
                OpportunityWrapper oppWrapperItem = new OpportunityWrapper();
                oppWrapperItem.Name = oppItem.Name;
                oppWrapperItem.nameUrl = '/' + oppItem.Id;
                oppWrapperItem.Account = '/' + oppItem.AccountId;
                oppWrapperItem.AccountName = oppItem.Account.Name;
                oppWrapperItem.StageName = oppItem.StageName;
                oppWrapperItem.Amount = oppItem.Amount;
                oppWrapperItem.Type = oppItem.Type;
                oppWrapper.add(oppWrapperItem);
            }
            return oppWrapper;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }
    }

    @AuraEnabled
    public static List<AccountWrapper> getAccountData(){
        try {
            List<AccountWrapper> accountWrapper = new List<AccountWrapper>();
            for(Opportunity accountItem:[SELECT AccountId, Account.Name, Account.Phone, Account.BillingCity from Opportunity where StageName != 'Closed Won']){
                AccountWrapper accountWrapperItem = new AccountWrapper();
                accountWrapperItem.Name = accountItem.Account.Name;
                accountWrapperItem.nameUrl = '/' + accountItem.AccountId;
                accountWrapperItem.Phone = accountItem.Account.Phone;
                accountWrapperItem.BillingCity = accountItem.Account.BillingCity;
                accountWrapper.add(accountWrapperItem);
            }
            System.debug(accountWrapper);
            return accountWrapper;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }
    }

    @AuraEnabled
    public static List<CaseWrapper> getCaseData(){
        try {
            Set<Id> accountIdSet = new Set<Id>();
            for(Opportunity oppItem:[SELECT AccountId from Opportunity where StageName != 'Closed Won']){
                accountIdSet.add(oppItem.AccountId);
            }
            List<CaseWrapper> caseWrapper = new List<CaseWrapper>();
            for(Case caseItem:[Select id, AccountId, Account.Name, CaseNumber, Subject, Owner.Name from Case]){
                if(accountIdSet.contains(caseItem.AccountId)){
                    CaseWrapper caseWrapperItem = new CaseWrapper();
                    caseWrapperItem.CaseNumber = caseItem.CaseNumber;
                    caseWrapperItem.nameUrl = '/' + caseItem.Id;
                    caseWrapperItem.Account = '/' + caseItem.AccountId;
                    caseWrapperItem.AccountName = caseItem.Account.Name;
                    caseWrapperItem.Subject = caseItem.Subject;
                    caseWrapperItem.OwnerName = caseItem.Owner.Name;
                    caseWrapper.add(caseWrapperItem);
                }
            }
            return caseWrapper;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }
    }
}