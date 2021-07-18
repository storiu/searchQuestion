import people_also_ask

ask_quesions = people_also_ask.get_related_questions("what is a business course?", 14)
i = 0
while i < len(ask_quesions):
    print(i + 1)
    print(ask_quesions[i])
    answer_body = people_also_ask.get_answer( ask_quesions[i] )
    print( answer_body['header'] )
    print( answer_body['response'] )
    i += 1
    
    
