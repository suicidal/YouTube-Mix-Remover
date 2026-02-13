(() => {
  console.log('script loaded');
	
  const mixRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([^&]+).*(&list=RD[^&]+|&start_radio=1)/;
  console.log('regex: ', mixRegex);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || !a.href) return;
    const match = a.href.match(mixRegex);
    if (match) {
		console.log('regex matched!', match[1]);
      e.preventDefault();
      e.stopImmediatePropagation();

      const cleanUrl = `https://www.youtube.com/watch?v=${match[1]}`;
	  console.log('clean url:', cleanUrl);


      window.location.assign(cleanUrl);
    }
  }, true);
})();
