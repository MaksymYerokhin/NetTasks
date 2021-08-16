using System;
using System.Collections.Generic;

namespace NetTask2
{
    class Program
    {
        static void Main(string[] args)
        {
            var testStrings = new List<string> { "11010", "111000", "010101", "110010", "10011" };
            testStrings.ForEach(s => Console.WriteLine($"{s} => {TestBinaryString(s)}"));
        }

        /// <summary>
        /// Tests the string that contains only 0's and 1's
        /// String is supposed to be good if:
        /// 1. The number of 0's is equal to the number of 1's.
        /// 2. For every prefix of the binary string, the number of 1's should
        /// not be less than the number of 0's.
        /// </summary>
        /// <param name="binaryString">contains only 0's and 1's</param>
        /// <returns></returns>
        static bool TestBinaryString(string binaryString) 
        {
            bool isGood = true;
            int sum = 0;

            for (int i = 0; i < binaryString.Length; i++)
            {
                sum += binaryString[i] == '1' ? 1 : -1;
                if (sum < 0)
                {
                    isGood = false;
                    break;
                }
            }

            return isGood && sum == 0;
        }
    }
}
