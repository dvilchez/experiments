import XCTest
@testable import enigma

final class enigmaTests: XCTestCase {
    func testEncription() throws {
        let plugTable: [Character: Character] = [:]
        XCTAssertEqual(enigma().process(message: "Hello, World!", plugTable: plugTable, rotors: []), "Hello, World!")
    }
    
    func testEncriptionWithPlugBoard() throws {
        let message = "Hello, World!"
        let plugTable: [Character: Character] = ["e": "v", "v":"z"]
        
        XCTAssertEqual(enigma().process(message: message, plugTable: plugTable, rotors: []), "Hzllo, World!")
    }
    
    func testEncriptionOneCharacterWithRotors() throws {
        let message = "c"
        let plugTable: [Character: Character] = [:]
        let rotorOne: String = "ekmflgdqvzntowyhxuspaibrcj".lowercased()
        let rotorTwo: String = "ajdksiruxblhwtmcqgznpyfvoe".lowercased()
        let rotorThree: String = "bdfhjlcprtxvznyeiwgakmusqo".lowercased()
        let reflector: String = "yruhqsldpxngokmiebfzcwvjat".lowercased()
        
        XCTAssertEqual(enigma().process(message: message, plugTable: plugTable, rotors: [reflector,rotorThree, rotorTwo, rotorOne]), "p")
    }
}

final class rotorTests: XCTestCase {
    func testWiring() throws {
        let encryptedChar = enigma().encryptForward(
            rotor: Rotor(wiring: "ekmflgdqvzntowyhxuspaibrcj", key: "a"),
            key: "c"
        )
        
        XCTAssertEqual(encryptedChar, "f")
    }
    
    func testInitialPosition() throws {
        let encryptedChar = enigma().encryptForward(
            rotor: enigma().moveRotor(rotor: Rotor(wiring: "ekmflgdqvzntowyhxuspaibrcj", key: "a"), key: "f"),
            key: "c"            
        )
        
        XCTAssertEqual(encryptedChar, "v")
    }
}
