

#openai.api_key = os.environ.get('OPENAI_KEY')

def lambda_handler(user_move, moves_string):
    # Set your OpenAI GPT API key from environment variables

    try:
        # Assuming your incoming event contains a 'move' and 'moves' field
        #user_move = event.get('move')
        #poss_moves = event.get('moves')
        
        moves = moves_string.split(',')
        original_moves = moves
        Dict = {"N": "night", "B": "bishop", "R": "rook", "Q": "queen", "K": "king", "O": "castle"}
        alf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        pawn_move = True

        if user_move.find("check") != -1:
            moves[:] = [item for item in moves if "+" in item]   

        if user_move.find("checkmate") != -1:
            moves[:] = [item for item in moves if "#" in item]

        if user_move.find("take") != -1:
            moves[:] = [item for item in moves if "x" in item]

        for key in Dict:
            if user_move.find(Dict.get(key)) != -1:
                moves[:] = [item for item in moves if key in item]   
                pawn_move = False   
                break
        if (pawn_move):
            moves[:] = [item for item in moves if all(letter.islower() or not letter.isalpha() for letter in item)]

        for i in range(1, 9):
            for letter in alf:
                square = letter + str(i)
                if user_move.find(square) != -1:
                    moves[:] = [item for item in moves if square in item] 
         
                

        # Call the OpenAI GPT API to get a response
        #response = openai.Completion.create(
        #    engine="text-davinci-003",
        #    prompt=f"chess moves: {poss_moves} (these moves follow proper chess notation meaning that a move like \"d4\" must be a pawn move) from this prompt: \"{user_move}\" tell me the move that corresponds with one from the list. Return only that move and nothing else. If there is an issue, return only Error",
        #    max_tokens=1
        #)

        # Extract the generated text from the API response
        #answer = response['choices'][0]['text'].strip()

        # Return the response
        #return {
        #    'statusCode': 200,
        #    'body': json.dumps({'answer': answer})
        #}
        return moves

    except Exception as e:
       return e

poss = "e4,Nf3,d4,Bb5+,c4,O-O,Nc3,Ba4,Bb3,Nd5,exd5,Re1,Nxd4,Bg4,Nf5,Nxe7+,Qxe7,Bxe7,Bxf8,Nxf6+,gxf6,Nxd7,Re7,Rae1,Nxf7,Rxe7+,Kxf7,Re8+,Bxe8,O-O-O,exd6e.p.,e8=Q,Nbd7+,Kh8,Qxf8+#"
user = "bishop to b5"
print (lambda_handler(user, poss))

user = "d5"
print (lambda_handler(user, poss))

user = "knight to d5"
print (lambda_handler(user, poss))

user = "bishop takes e7"
print (lambda_handler(user, poss))

user = "knight to f6"
print (lambda_handler(user, poss))

user = "castle"
print (lambda_handler(user, poss))

