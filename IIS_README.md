# Setting Up IIS for URL rewriting

1. Install IIS
2. Install url-rewrite extension for IIS (https://www.iis.net/downloads/microsoft/url-rewrite)
3. Install Application Request Routing (ARR) extension for IIS (https://www.iis.net/downloads/microsoft/application-request-routing)
4. Launch the IIS Manager
5. Select the web server in the connections pane and launch the ARR Cache feature.  
6. In the actions pane on the right, click Server Proxy Settings
7. Check the box labeled Enable Proxy and click Apply
8. Select the site hosting TAS (typically, 'Default Web Site') and launch the URL Rewrite feature
9. Click 'Add Rule(s)' in the Actions pane
10. Select 'Blank rule' and click OK on the Add Rule(s) dialog
11. Supply an appropriate rule name, and type enter '/tads/api/*' in the Pattern box
12. Select 'Wildcards' in the Using combo box.
13. Enter 'localhost:3000/tads/api/{R:0}' in the Action Properties box
14. Click Apply
15. Restart the IIS server and verify http://localhost/tads/api/v1/personnel returns a JSON list of personnel
