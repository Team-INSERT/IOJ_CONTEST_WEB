const defaultCode = {
  C: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}`,
  CPP: `#include <iostream>\n\nusing namespace std;\n\nint main() {\n\tcout << "Hello World!" << endl;\n}`,
  JAVA: `import java.util.*;\n\npublic class main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!");\n\t}\n}`,
  PYTHON: `print("Hello World!")`,
};

export default defaultCode;
