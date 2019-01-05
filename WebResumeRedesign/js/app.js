function perf(type, name, data, options="") {
  //TODO: Send the data to the server
  console.log(`%c${type}: %c${name} | %c${data?Math.round(data) + 'ms':''} %c${options}`, "color: red", "color: green", "color: silver", "color: lightblue");
}

window.addEventListener("load", () => {
  const navEntries = performance.getEntriesByType("navigation");
  navEntries.forEach( entry => {
    perf("navigation", "fetch-start", entry.fetchStart);
    const ttfb = entry.responseStart-entry.fetchStart;
    perf("navigation", "ttfb", ttfb);
  });
  //Resource Timing API
  const resEntries = performance.getEntriesByType("resource");
  resEntries.forEach( entry => {
    const size = `${Math.round(entry.encodedBodySize/1024)}Kb`;
    const ttfb = entry.responseStart-entry.fetchStart;
    perf("navigation", "ttfb", ttfb);
    perf(entry.initiatorType, entry.name, ttfb, size);
  });
  
  //Performance Observer for User Timing
  const userObserver = new PerformanceObserver( list => {
    list.getEntries().forEach( entry => {
      perf(entry.entryType, entry.name, entry.startTime);
    });
  });
  userObserver.observe({ entryTypes: ["mark"]});
});