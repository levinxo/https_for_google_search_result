chrome.windows.getCurrent(function(w){
	chrome.tabs.getAllInWindow(w.id, function(tabs){
		var c = 0;
		for (var i = 0; i < tabs.length; i++) {
			var pattern = /http:\/\/www\.google\.com(\.hk)?(\.tw)?\/url\?/;
			var tabId = tabs[i].id;
			var tabUrl = tabs[i].url;
			if (pattern.exec(tabUrl)) {
				tabUrl = 'https' + tabUrl.slice(4);
				chrome.tabs.update(tabId, {url: tabUrl});
				c++;
			}
		}
		var dialog = document.getElementById('dialog');
		if (c == 0) {
			dialog.innerText = '没有找到相应链接需要变更为HTTPS';
		} else {
			dialog.innerText = '改变了' + c + '个链接';
		}
	});
});