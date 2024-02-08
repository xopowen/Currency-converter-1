
chrome.runtime.onMessage.addListener(
     function(request, sender, sendResponse) {
         console.log(request)

        if(request?.save){
            chrome.storage.local.set({ 'saved-info': request.save }).then(() => {
                console.log("Value is set");
            });
        }
        if(request?.getSettings){
            chrome.storage.local.get(["saved-info"]).then((result) => {
                if(result){
                    console.log("Value is " + Object.entries( result['saved-info']));
                    sendResponse( result['saved-info']);
                }
            });
            return true
        }

    }
);
