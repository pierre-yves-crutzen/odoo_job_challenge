A context switch occurs when the kernel or hardware thinks its time to do something else.
Nobody have no control of it 'period' the only way to measure it is to get into the kernel,
to remove 'everything' and check it directly without running any other programs and device drivers...
  
Basically we can measure the whole process: program executing, switch, do something else, switch, 
complete the execution.
 
So it is needed to try to measure something that should have very little variation and should scale well.
ie 'multiply and accumulate' (machine instruction in most of DSP to calculate a signal) a register.
Doing the ops few times and profile them. Then changing the total number of times to do it and reprofile..  
Of course smaller context switches may be getting buried in the testing method...; not to mention the timers effects etc.

What we should looking for is a statistical blip; the 'multiply-accumulate' should just shift right when we scale it.. 
anything that stays still isnt part of the test. Its likely to be some part of the kernels context switching or device drivers.
 
Anyway the results might look as expected.