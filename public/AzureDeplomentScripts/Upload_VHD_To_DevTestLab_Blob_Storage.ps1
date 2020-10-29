# Upload VHD to Blob Store
# Provide values for the variables
$resourceGroup = 'OPX-VHDs'
$storageaccount = 'aopxdevtestlab6464'
$containername = 'uploads'
$localPath = 'C:\VHDs\WinDF1\Virtual Hard Disks\WinVm2.vhd'
$vhdName = 'WinDF.vhd'


# Upload the VHD
$urlOfUploadedImageVhd = ('https://' + $storageaccount + '.blob.core.windows.net/' + $containername + '/' + $vhdName)
Add-AzVhd -ResourceGroupName $resourceGroup -Destination $urlOfUploadedImageVhd -LocalFilePath $localPath