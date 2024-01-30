chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
      // This is the first installation of the extension
      // Trigger the registration API call here
     console.log('This is the first installation of the extension'); 
    }
  });
   
export {};