import urllib
import re

symbolslist = ["ads","xlu","spy","goog","nflx","hig"]

i=0
while i<len(symbolslist):
	url = "http://finance.yahoo.com/q?s=" +symbolslist[i]
	htmlfile = urllib.urlopen(url)
	htmltext = htmlfile.read()
	regex = '<span id="yfs_l84_{}">(.+?)</span>'.format(symbolslist[i])
	pattern = re.compile(regex)
	price = re.findall(pattern,htmltext)
	print "The price of",symbolslist[i]," is " , price
	i+=2
