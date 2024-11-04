import pandas as pd
from sqlalchemy import create_engine

# Create a database connection
engine = create_engine('sqlite:///mydatabase.db')  # or MySQL, PostgreSQL, etc.

# Load each CSV file
df = pd.read_csv('LeetCode-Questions-CompanyWise//adobe_1year.csv')
df.to_sql('table_name', con=engine, if_exists='replace', index=False)

