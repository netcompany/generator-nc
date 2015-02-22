@IF EXIST "%~dp0\node.exe" (
  echo "using local node in 'tools' folder"
  "%~dp0\node.exe" "%~dp0..\node_modules\gulp\bin\gulp" %* 
) ELSE (
  echo "using global node install"
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0..\node_modules\gulp\bin\gulp" %*
)