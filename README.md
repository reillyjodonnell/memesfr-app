### Errors:

Problem:

`$ react-native start ios`
error listen EADDRINUSE: address already in use :::8081.

Solution:
First, you would want to know which process is using port 3000

`sudo lsof -i :8081`
this will list all PID listening on this port, once you have the PID you can terminate it with the following:

`kill -9 <PID>`
where you replace <PID> by the process ID, or the list of process IDs, the previous command output.
