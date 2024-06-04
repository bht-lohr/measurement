REM This command line starts chrome in local file access mode (security restriction off)
REM Script by Jürgen Lohr , Beuth-HS, Oliver Lietz, lietz@nanocosmos.de

REM set the path to your chrome.exe 
SET CHROME="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" goto err
%CHROME% --enable-usermedia-screen-capturing --allow-file-access-from-files "%CD%\30_measurement_all_v1.xhtml"
goto end
:err
echo.
echo Chrome.exe not found. Please install or set the path in this script
pause
:end
