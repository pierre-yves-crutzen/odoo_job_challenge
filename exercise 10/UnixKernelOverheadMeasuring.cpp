// UnixKernelOverheadMeasuring.c : 
/*
* Test 10: C++ (1/20)
* Write a C program that roughly measures the overhead of a context switch between the kernel and userspace on a UNIX/Linux system (without using the pthread API).
* Please indicate the assumptions your rough estimation is based on. ----> README.md
*/

#include <iostream>
#include <chrono>
#include <map>

int main()
{
	std::map<int, int> counts;
	for (int k = 0; k < 100; ++k)
	{
		std::cout << ".";
		for (int j = 0; j < 1000000; ++j)
		{
			auto start = std::chrono::system_clock::now();
			for (int i = 0; i < 100000; ++i)
			{
				i += i * i;
			}
			auto end = std::chrono::system_clock::now();

			int delta = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();

			// sigh.. crud but will work for now
			if (counts.find(delta) != counts.end())
				++(counts[delta]);
			else
				counts[delta] = 1;
		}
	}
	std::cout << "\n";

	for (std::map<int, int>::iterator cit = counts.begin();
		cit != counts.end();
		++cit)
	{
		std::cout << " " << cit->first << ":" << cit->second << "\n";
	}
}
