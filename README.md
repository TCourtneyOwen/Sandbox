[![Board Status](https://tcourtneyowen.visualstudio.com/a43f52aa-fccb-4726-afa5-290e4364db0b/7ee1e3f7-76fc-46e4-828b-574a14779ad4/_apis/work/boardbadge/dd42981f-546f-4d07-a13b-6e6209ca1528)](https://tcourtneyowen.visualstudio.com/a43f52aa-fccb-4726-afa5-290e4364db0b/_boards/board/t/7ee1e3f7-76fc-46e4-828b-574a14779ad4/Microsoft.RequirementCategory)
# Office-Addin-Test-Infrastructure

Provides a framework for testing Office Taskpane Add-ins by allowing Add-ins to send results to a test server.  The results can then be consumed and used
by tests to validate that the Add-in is working as expected.

## Command-Line Interface
* [start](#start)

### start
Start the test server. 

Syntax:

`office-addin-test-server start [options]`

Options:

`-p [port]`<br>
`--port [port]`<br>
    Port number must be between 0 - 65535. If no port specified, port defaults to 8080
#
