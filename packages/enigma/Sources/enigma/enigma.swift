@main
public struct enigma {
    func toString(characters: [Character]) -> String {
            return String(characters)
    }
    
    func createPlugBoard(plugTable: [Character:Character]) -> (_: String) -> String {
        return { (message : String) -> String in
            toString(characters: message.map({(char: Character) -> Character in
                return plugTable[char] ?? char
            }))
        }
    }
    
    public func process(message: String, plugTable: [Character: Character], rotors: [String]) -> String {
        let applyPlugBoardTranform = createPlugBoard(plugTable: plugTable)
        let firstTransform = applyPlugBoardTranform(message)
        if(rotors.count == 0) {
            return applyPlugBoardTranform(firstTransform)
        }
        let io = "abcdefghijklmnopqrstuvwxyz";
        let rotated = "bcdefghijklmnopqrstuvwxyza";
        //var rotor = rotors[3]
        let secondTransform = toString(characters: firstTransform.map({(char: Character) -> Character in
            let index = io.firstIndex(of: char) ?? io.startIndex
            //let first = rotor.first
            //rotor = String(rotor.dropFirst())
            //rotor.append(first ?? "a")
            
            let firstRootKey = rotated.firstIndex(of: rotors[3][io.firstIndex(of: rotated[index]) ?? io.startIndex]) ?? rotated.startIndex
            //print(rotated[index])
            //print(rotors[3][io.firstIndex(of: rotated[index]) ?? io.startIndex])
            //print(rotors[3][index])
            //print(io[firstRootKey])
            let secondRootKey = io.firstIndex(of: rotors[2][io.firstIndex(of: io[firstRootKey]) ?? io.startIndex]) ?? io.startIndex
            //print(io[secondRootKey])
            let thirdRootKey = io.firstIndex(of: rotors[1][io.firstIndex(of: io[secondRootKey]) ?? io.startIndex]) ?? io.startIndex
            //print(io[thirdRootKey])
            let reflectorKey = io.firstIndex(of: rotors[0][io.firstIndex(of: io[thirdRootKey]) ?? io.startIndex]) ?? io.startIndex
            //print(io[reflectorKey])
            
            let thirdBackRootKey = io.firstIndex(of: io[rotors[1].firstIndex(of: io[reflectorKey]) ?? io.startIndex]) ?? io.startIndex
            //print(io[thirdBackRootKey])
            
            let secondBackRootKey = io.firstIndex(of: io[rotors[2].firstIndex(of: io[thirdBackRootKey]) ?? io.startIndex]) ?? io.startIndex
            //print(io[secondBackRootKey])
            let firstBackRootKey = rotated.firstIndex(of: io[rotors[3].firstIndex(of: rotated[secondBackRootKey]) ?? io.startIndex]) ?? rotated.startIndex
            
            return io[firstBackRootKey]
        }))
        return applyPlugBoardTranform(secondTransform)
    }
    
    func advance(rotor: Rotor) -> Rotor {
        return moveRotor(rotor: rotor, key: RotorHeader().getNextKey(rotor: rotor))
    }
    
    public func moveRotor(rotor: Rotor, key: Character) -> Rotor {
        var wiring = Array(rotor.wiring)
        for _ in RotorHeader().getIndex(key: rotor.key)..<RotorHeader().getIndex(key: key)  {
            let letter = wiring.removeFirst()
            wiring.append(letter)
        }
        
        return Rotor(wiring: String(wiring), key: key)
    }
    
    func inputFromRight(rotor: Rotor, key: Character) -> Character{
        return Rotor.getWiredKey(position: RotorHeader().getIndex(key: key), rotor: rotor)
    }
    
    public func encryptForward(rotor: Rotor, key: Character) -> Character {
        return inputFromRight(rotor: advance(rotor: rotor), key: key)
    }
    
    public static func main() {}
}
