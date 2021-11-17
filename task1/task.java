import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class task {
  static int parityPositions[] = { 0, 1, 3, 7 };
  static final int LENGTH = 11;

  public static void main(String[] args) {
    // Schreiben Sie ein Programm, das aus der folgenden 11,7 Hamming-codierten
    // Bitfolge die Nachricht _extrahiert_. Verwenden Sie dafür die _Sprache B_ aus
    // dem Sprachpaar.
    // 11 Bit zum decodieren: 01001100001
    // result: 0110001
    // language: typescript

    int input[] = stringToIntArray("00000101001"); // right string 00001101001

    String output = intArrayToString(hammingDecode74(input));
    System.out.println(output);
  }

  private static int[] hammingDecode74(int[] input) {
    int[] result = input;
    int parities[] = getParities(input);
    List<Integer> all_flips = new ArrayList<>();

    // get all flipped bits
    for (int i = 0; i < parityPositions.length / 2; i++) {
      for (int j = parityPositions.length / 2; j < parities.length; j++) {
        all_flips = addToList(all_flips, checkBitFlipsWithTwoParityBits(parityPositions[i], parityPositions[j], input));
      }
    }
    System.out.println("wrong positions: " + all_flips.toString());

    // correct flipped bits
    for (int i = 0; i < all_flips.size(); i++) {
      result[all_flips.get(i)] = (result[all_flips.get(i)] + 1) % 2;
    }

    // sort out parity bits from input
    int cleanedResult[] = { result[2], result[4], result[5], result[6], result[8], result[9], result[10] };
    return cleanedResult;
  }

  public static List<Integer> addToList(List<Integer> list, List<Integer> list2) {
    for (int i = 0; i < list2.size(); i++) {
      list.add(list2.get(i));
    }
    return list;
  }

  // get all indices which need to be checked for a parity bit at position pos
  private static List<Integer> getPositionsToCheck(int pos) {
    List<Integer> result = new ArrayList<>();
    for (int i = 1; i < LENGTH + 1; i++) {
      if (i > pos && checkPosition(i, pos)) {
        if (pos != i - 1) {
          result.add(i - 1);
        }
      }
    }
    return result;
  }

  // check whether position i is checked by parity bit at position pos
  private static boolean checkPosition(int i, int pos) {
    String str = Integer.toBinaryString(i);
    int index = (int) (Math.log(pos + 1) / Math.log(2));
    int val = str.charAt(str.length() - index - 1) - '0';
    return val == 1;
  }

  // check if bitstring has a parity for all positions which are checked by bit at
  // position pos
  private static int checkForParity(String bitstring, int pos) {
    int result = 0;
    List<Integer> positionsToCheck = getPositionsToCheck(pos);

    for (int i = 0; i < positionsToCheck.size(); i++) {
      result += Integer.parseInt(String.valueOf(bitstring.charAt(positionsToCheck.get(i))));
    }
    return result % 2;
  }

  private static List<Integer> checkBitFlipsWithTwoParityBits(int pos1, int pos2, int[] input) {
    List<Integer> flips = new ArrayList<>();
    int[] result = new int[7];

    int oldParity1 = input[pos1];
    int oldParity2 = input[pos2];
    int actualParity1 = checkForParity(intArrayToString(input), pos1);
    int actualParity2 = checkForParity(intArrayToString(input), pos2);

    if (oldParity1 != actualParity1) {
      if (oldParity2 != actualParity2) {
        int posToFix = pos1 + pos2 + 2 - 1;
        // System.out.println("position to fix: " + posToFix);
        flips.add(posToFix);
      }
    }

    return flips;
  }

  private static int[] getParities(int[] input) {
    int parities[] = new int[4];

    for (int i = 0; i < parityPositions.length; i++) {
      parities[i] = input[parityPositions[i]];
    }

    return parities;
  }

  // HELPER functions ----------------------
  public static int charToInt(char c) {
    return c - '0';
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