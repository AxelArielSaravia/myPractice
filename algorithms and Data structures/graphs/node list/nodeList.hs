{- 
 - NODELIST whit one value
 -}

data NodeList a = Null 
                | Node a (NodeList a)
                deriving Show

--FUNCTIONS for NodeList
nListLength :: NodeList a -> Int
nListLength Null = 0
nListLength (Node _ x) = 1 + nListLength x

--Add values
nListConcat :: NodeList a -> NodeList a -> NodeList a 
nListConcat Null y = y
nListConcat (Node a b) y = Node a $ nListConcat b y

nListAdd :: NodeList a -> a -> NodeList a
nListAdd Null a = Node a Null
nListAdd (Node x y) a = Node a $ Node x y

nListPush :: NodeList a -> a -> NodeList a
nListPush Null a = Node a Null
nListPush (Node _ y) a = nListPush y a

--Search (recursive)
nListSearch :: Eq a => NodeList a -> a -> Maybe a
nListSearch Null _ = Nothing
nListSearch (Node a b) y | a == y = Just a
                         | otherwise = nListSearch b y 

--Delete
nListDelete :: Eq a => NodeList a -> a -> NodeList a
nListDelete Null _ = Null
nListDelete (Node a y) x | x == a = y
                         | otherwise = Node a $ nListDelete y x

nListPop :: NodeList a -> NodeList a
nListPop Null = Null
nListPop (Node _ Null) = Null
nListPop (Node _ x) = nListPop x


nListToList :: NodeList a -> [a]
nListToList Null = []
nListToList (Node a b) = a : nListToList b


{- 
 - NODELIST whit two value
 -}
data AssociativeList a b = Empty 
                         | Keys a b (AssociativeList a b)
                         deriving Show

--FUNCTIONS for AssociativeList
aListLength :: AssociativeList a b -> Int
aListLength Empty = 0
aListLength (Keys _ _ x) = 1 + aListLength x

--Add values
aListConcat :: AssociativeList a b -> AssociativeList a b -> AssociativeList a b
aListConcat Empty y = y
aListConcat (Keys a b l) y = Keys a b $ aListConcat l y

aListAdd :: AssociativeList a b -> (a, b) -> AssociativeList a b
aListAdd Empty (a, b) = Keys a b Empty
aListAdd (Keys x y z) (a, b) = Keys a b $ Keys x y z

aListPush :: AssociativeList a b -> (a, b) -> AssociativeList a b
aListPush Empty (a, b) = Keys a b Empty
aListPush (Keys _ _ z) x = aListPush z x

--Search (recursive)
aListSearch :: Eq a => AssociativeList a b -> a -> Maybe b 
aListSearch Empty _ = Nothing
aListSearch (Keys a b x) y | a == y = Just b 
                           | otherwise = aListSearch x y 

--Delete
aListDelete :: Eq a => AssociativeList a b -> a ->  AssociativeList a b 
aListDelete Empty _ = Empty
aListDelete (Keys a b y) x | x == a = y
                           | otherwise = Keys a b $ aListDelete y x

aListPop :: AssociativeList a b -> AssociativeList a b
aListPop Empty = Empty
aListPop (Keys _ _ Empty) = Empty
aListPop (Keys _ _ x) = aListPop x



aListToList :: AssociativeList a b -> [(a ,b)]
aListToList Empty = []
aListToList (Keys a b x) = (a, b) : aListToList x


type Dictionary = AssociativeList String String;

-- Example
listA :: Dictionary
listA = Keys "A" "arbol" $ Keys "B" "barca" $ Keys "C" "cosa" $ Keys "D" "diamante" Empty