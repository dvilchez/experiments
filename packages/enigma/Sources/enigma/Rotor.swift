public struct Rotor : Equatable {
    let wiring: String
    let key: Character
    
    public static func getWiredKey(position: Int, rotor: Rotor) -> Character {
        return Array(rotor.wiring)[position]
    }
}

public struct RotorHeader {
    let header = Array("abcdefghijklmnopqrstuvwxyz")
    
    public func getNextKey(rotor: Rotor) -> Character {
        return header[(header.firstIndex(of: rotor.key) ?? 0)+1]
    }
    
    public func getIndex(key: Character) -> Int {
        return header.firstIndex(of: key) ?? -1;
    }
}
