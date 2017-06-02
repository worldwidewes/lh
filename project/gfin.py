from googlefinance import getQuotes
import json

symbolslist = ["ads","hig"]

i=0
while i<len(symbolslist):

	print json.dumps(getQuotes(symbolslist[i]), indent=2)
	i+=1