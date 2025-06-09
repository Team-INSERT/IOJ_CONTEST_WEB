const defaultCode = {
  C: `#include <stdio.h>\n\nint main() {\n  int a, b;\n  scanf("%d %d", &a, &b);\n  printf("%d\\n", a * b);\n  return 0;\n}`,
  CPP: `#include <iostream>\n\nusing namespace std;\n\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a * b << endl;\n  return 0;\n}`,
  JAVA: `import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a * b);\n  }\n}`,
  PYTHON: `a, b = map(int, input().split())\nprint(a * b)`,
};

export default defaultCode;
