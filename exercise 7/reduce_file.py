def reduce_file(name, n=7):
    size = n * 2048
    with open(name, 'rb') as rfile, open(name, 'rb+') as wfile:
        rfile.seek(n-1)
        wfile.seek(n-1)
        data = bytearray(rfile.read(size))
        while data:
            del data[::n]
            wfile.write(data)
            data = bytearray(rfile.read(size))
        wfile.truncate()
		
		
reduce_file("data",7)