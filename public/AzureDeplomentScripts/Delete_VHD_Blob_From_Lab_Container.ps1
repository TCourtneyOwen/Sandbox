# Select the desired Azure subscription. 
$subscriptionId = 'fb31a92f-824a-4de5-bf31-722222f81009'
Select-AzSubscription -SubscriptionId $subscriptionId

# Get the lab object.
$labRg = 'OPX-VHDs'
$labName = 'OPX-Dev-Test-Lab'
$lab = Get-AzResource -ResourceId ('/subscriptions/' + $subscriptionId + '/resourceGroups/' + $labRg + '/providers/Microsoft.DevTestLab/labs/' + $labName)

# Get the lab storage account and lab storage account key values.
$labStorageAccount = Get-AzResource -ResourceId $lab.Properties.defaultStorageAccount 
$labStorageAccountKey = (Get-AzStorageAccountKey -ResourceGroupName $labStorageAccount.ResourceGroupName -Name $labStorageAccount.Name)

$ctx = New-AzureStorageContext -StorageAccountName $labStorageAccount.Name -StorageAccountKey $labStorageAccountKey[0].Value

$container = 'uploads'
$vhdBlobName = 'WinDF.vhd'

az storage blob delete -n $vhdBlobName -c $container --account-name $labStorageAccount.Name --account-key $labStorageAccountKey[0].Value

az storage blob list --container-name $container --account-name $labStorageAccount.Name --account-key $labStorageAccountKey[0].Value