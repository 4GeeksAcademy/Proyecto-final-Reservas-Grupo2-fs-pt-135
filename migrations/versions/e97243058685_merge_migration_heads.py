"""Merge migration heads

Revision ID: e97243058685
Revises: b1e21c138a4f, d971aa8dab6c
Create Date: 2026-07-04 00:08:37.944397

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e97243058685'
down_revision = ('b1e21c138a4f', 'd971aa8dab6c')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
