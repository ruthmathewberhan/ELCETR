const Singleton = (function(pManager){
    //let pManager
  
    function ProcessManager(pManager) { /*...*/ }
  
    function createProcessManager(pManager)
    {
      pManager = new ProcessManager(pManager)
      return pManager
    }
  
    return {
        getProcessManager: (pManager) =>
        {
          if(!pManager)
            pManager = createProcessManager()
          return pManager
        }
    }
  })()
  
//   const singleton = Singleton.getProcessManager(pManager)
//   const singleton2 = Singleton.getProcessManager(pManager)
  
//   console.log(singleton === singleton2) // true