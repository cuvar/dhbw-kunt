public class task {
  public static void main(String[] args) {
    // Schreiben Sie ein Programm, das aus der folgenden 11,7 Hamming-codierten
    // Bitfolge die Nachricht _extrahiert_. Verwenden Sie dafür die _Sprache B_ aus
    // dem Sprachpaar.
    // 11 Bit zum decodieren: 01001100001
    // result: 0110001
    // language: typescript

    int input[] = stringToIntArray("01001100001");
    String output = intArrayToString(hammingDecode74(input));
    System.out.println(output);
  }

  private static int[] hammingDecode74(int[] input) {
    int[] result = new int[7];
    int parities[] = getParities(input);
    // System.out.println(parities[0] + " " + parities[1] + " " + parities[2] + " "
    // + parities[3]);
    for (int i = 0; i < 7; i++) {

      if (parities[i] == 1) {
        result[i] = input[i] ^ 1;
      } else {
        result[i] = input[i];
      }
    }

    return result;
  }

  private static int[] getParities(int[] input) {
    int parities[] = new int[4];
    int parityPositions[] = { 0, 1, 3, 7 };

    for (int i = 0; i < parityPositions.length; i++) {
      parities[i] = input[parityPositions[i]];
    }

    return parities;
  }

  public static int charToInt(char c) {
    return (int) c;
  }

  public static int[] stringToIntArray(String s) {
    int[] result = new int[s.length()];
    for (int i = 0; i < s.length(); i++) {
      result[i] = charToInt(s.charAt(i));
    }
    return result;
  }

  public static String intArrayToString(int[] array) {
    String result = "";
    for (int i = 0; i < array.length; i++) {
      result += array[i];
    }
    return result;
  }
}