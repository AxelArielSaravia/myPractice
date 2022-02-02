data BinaryTree a = Empty 
                  | Node (BinaryTree a) a (BinaryTree a) 
                deriving Show


bTreeLength :: BinaryTree a -> Int
bTreeLength Empty = 0
bTreeLength (Node treeL _ treeR) = 1 + bTreeLength treeL + bTreeLength treeR


bTreeEmptyNodes :: BinaryTree a -> Int
bTreeEmptyNodes Empty = 1
bTreeEmptyNodes (Node treeL _ treeR) = bTreeEmptyNodes treeL + bTreeEmptyNodes treeR


bTreeMap :: (a -> b) -> BinaryTree a -> BinaryTree b
bTreeMap _ Empty = Empty
bTreeMap f (Node treeL a treeR) = Node (bTreeMap f treeL) (f a) (bTreeMap f treeR)



-- DATA EXMPLE 
type Prefijos = BinaryTree String
can, cana, canario, canas, cant, cantar, canto :: Prefijos
can     = Node cana "can" cant
cana    = Node canario "a" canas
canario = Node Empty "rio" Empty
canas   = Node Empty "s" Empty
cant    = Node cantar "t" canto
cantar  = Node Empty "ar" Empty
canto   = Node Empty "o" Empty

type Numeros = BinaryTree Int
uno, dos, tres, cuatro, cinco :: Numeros
uno    = Node Empty 1 Empty
dos    = Node uno 2 uno
tres   = Node uno 3 dos  
cuatro = Node dos 4 dos
cinco  = Node uno 5 cuatro 