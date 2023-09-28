INSERT INTO departments (department_name)
VALUES                  ("Management"),
                        ("HR"),
                        ("Front-End Development"),
                        ("Back-End Development"),
                        ("Security");


INSERT INTO roles   (title, salary, department_id)
VALUES              ("CEO", 500000, 1),
                    ("Manager", 105000, 1),
                    ("HR Manager", 70000, 2),
                    ("HR Representative", 50000, 2),
                    ("Front-End Lead Developer", 90000, 3),
                    ("Front-End Developer", 80000, 3),
                    ("Back-End Lead Developer", 100000, 4),
                    ("Back-End Developer", 90000, 4),
                    ("Gaurd", 50000, 5);

INSERT INTO employees   (first_name, last_name, roles_id, manager_id)
VALUES                  ("John", "Wick", 1, NULL),
                        ("Kev", "Sulisław", 2, 1),
                        ("Fredy", "Bill", 3, 2),
                        ("Norbert", "Tymoteusz", 4, 3),
                        ("Robbie", "Kyro", 5, 2),
                        ("Farley", "Hipolit", 6, 5),
                        ("Hughie", "Cedric", 6, 5),
                        ("Watson", "Hubert", 7, 2),
                        ("Hiram", "Radzimierz", 8, 7),
                        ("Tomasz", "Dewey", 8, 7),
                        ("Sunday", "Wojciech", 9, 2);