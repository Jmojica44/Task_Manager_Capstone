"""empty message

Revision ID: b2af8363c272
Revises: e9053ded483e
Create Date: 2023-05-01 09:50:53.058225

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b2af8363c272'
down_revision = 'e9053ded483e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.add_column(sa.Column('timeframe', sa.String(length=255), nullable=True))
        batch_op.alter_column('start_date',
               existing_type=mysql.INTEGER(),
               type_=sa.String(length=255),
               existing_nullable=True)
        batch_op.alter_column('end_date',
               existing_type=mysql.INTEGER(),
               type_=sa.String(length=255),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.alter_column('end_date',
               existing_type=sa.String(length=255),
               type_=mysql.INTEGER(),
               existing_nullable=True)
        batch_op.alter_column('start_date',
               existing_type=sa.String(length=255),
               type_=mysql.INTEGER(),
               existing_nullable=True)
        batch_op.drop_column('timeframe')

    # ### end Alembic commands ###