self.onmessage=async t=>{const{id:s,...e}=t.data;for(const t of Object.keys(e))self[t]=e[t];try{let t;s<0?(importScripts(self.pyodide),self.pyodide=await loadPyodide(),await self.pyodide.loadPackage("micropip"),t=await self.pyodide.runPythonAsync("\n      import micropip\n      from js import packages, optlite\n      await micropip.install(optlite)\n      for p in packages:\n          await micropip.install(p)\n      ")):(await self.pyodide.loadPackagesFromImports(self.script),t=await self.pyodide.runPythonAsync("\n      import optlite\n      from js import script, rawInputLst\n      optlite.exec_script(script, rawInputLst)\n      ")),self.postMessage({results:t,id:s})}catch(t){self.postMessage({error:"Failed to run code: "+t.message,id:s})}};