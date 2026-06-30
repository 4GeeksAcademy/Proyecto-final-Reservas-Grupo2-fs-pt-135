from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

business_category = db.Table(
    "business_category",
    db.Column("business_profile_id", db.Integer, db.ForeignKey("business_profile.id"), primary_key=True),
    db.Column("category_id", db.Integer, db.ForeignKey("category.id"), primary_key=True)
)

class Category(db.Model):
    __tablename__ = "category"
    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)

    businesses: Mapped[list["BusinessProfile"]] = relationship("BusinessProfile", secondary=business_category, back_populates="categories")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "is_active": self.is_active
        }


class User(db.Model):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    client_profile: Mapped["ClientProfile"] = relationship(
        "ClientProfile",
        back_populates="user",
        uselist=False
    )

    business_profile: Mapped["BusinessProfile"] = relationship(
        "BusinessProfile",
        back_populates="user",
        uselist=False
    )

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role,
            "is_active": self.is_active
        }


class ClientProfile(db.Model):
    __tablename__ = "client_profile"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)

    user: Mapped["User"] = relationship(
        "User", back_populates="client_profile")
    
    favorite_businesses: Mapped[list["FavoriteBusiness"]] = relationship("FavoriteBusiness", back_populates="client", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "phone": self.phone
        }


class BusinessProfile(db.Model):
    __tablename__ = "business_profile"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), unique=True, nullable=False)
    business_name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    
    
   
    country: Mapped[str] = mapped_column(String(80), nullable=False)
    province: Mapped[str] = mapped_column(String(80), nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    postal_code: Mapped[str] = mapped_column(String(20), nullable=False)
    address: Mapped[str] = mapped_column(String(180), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="business_profile")
    categories: Mapped[list["Category"]] = relationship("Category", secondary=business_category, back_populates="businesses")
    services: Mapped[list["Service"]] = relationship("Service", back_populates="business")
    portfolio: Mapped["BusinessPortfolio"] = relationship("BusinessPortfolio", back_populates="business_profile", uselist=False)
    gallery_images: Mapped[list["BusinessGallery"]] = relationship("BusinessGallery", back_populates="business_profile")



    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "business_name": self.business_name,
            "phone": self.phone,
            "categories": [category.serialize() for category in self.categories],
            "country": self.country,
            "province": self.province,
            "city": self.city,
            "postal_code": self.postal_code,
            "address": self.address
        }
    
    def serialize_search(self):
        return {
            "id": self.id,
            "business_name": self.business_name,
            "logo_url": self.portfolio.logo_url if self.portfolio else None,
            "description": self.portfolio.description if self.portfolio else None,
            "city": self.city,
            "province": self.province,
            "address": self.address,
            "categories": [category.serialize() for category in self.categories],
        }
    

class BusinessPortfolio(db.Model):
    __tablename__ = "business_portfolio"
    id: Mapped[int] = mapped_column(primary_key=True)
    business_profile_id: Mapped[int] = mapped_column(ForeignKey("business_profile.id"), unique=True, nullable=False)
    logo_url: Mapped[str] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(String(1000), nullable=True)
    business_profile: Mapped["BusinessProfile"] = relationship("BusinessProfile", back_populates="portfolio")

    def serialize(self):
        return {
            "id": self.id,
            "business_profile_id": self.business_profile_id,
            "logo_url": self.logo_url,
            "description": self.description
        }
    
    
    
class BusinessGallery(db.Model):
    __tablename__ = "business_gallery"
    id: Mapped[int] = mapped_column(primary_key=True)
    business_profile_id: Mapped[int] = mapped_column(ForeignKey("business_profile.id"), nullable=False)
    image_url: Mapped[str] = mapped_column(String(255), nullable=False)
    business_profile: Mapped["BusinessProfile"] = relationship("BusinessProfile", back_populates="gallery_images")

    def serialize(self):
        return {
            "id": self.id,
            "business_profile_id": self.business_profile_id,
            "image_url": self.image_url
        }


    
class Service(db.Model):
    __tablename__ = "service"
    id: Mapped[int] = mapped_column(primary_key=True)

    business_id: Mapped[int] = mapped_column(
        ForeignKey("business_profile.id"),
        nullable=False
    )

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    duration_minutes: Mapped[int] = mapped_column(nullable=False)
    status: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)

    business: Mapped["BusinessProfile"] = relationship(
        "BusinessProfile",
        back_populates="services"
    )

    def serialize(self):
        return {
            "id": self.id,
            "business_id": self.business_id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "duration_minutes": self.duration_minutes,
            "status": self.status,
        }

        
class Reservas(db.Model):
    __tablename__ = 'reservas'
    id: Mapped[int] = mapped_column(primary_key=True)
    client_id: Mapped[int] = mapped_column(ForeignKey("client_profile.id"), nullable=False)
    service_id: Mapped[int] = mapped_column(ForeignKey("service.id"), nullable=False)

    # Campos propios de una reserva
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="pendiente")
    notes: Mapped[str] = mapped_column(String(255), nullable=True)


    client: Mapped["ClientProfile"] = relationship("ClientProfile")
    service: Mapped["Service"] = relationship("Service")

    def serialize(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "service_id": self.service_id,
            # Convierte la fecha a string legible para el frontend
            "status": self.status,
            "notes": self.notes,
            "service_detail": {
            "name": self.service.name,
            "price": str(self.service.price),
            "business_id": self.service.business_id
            } if self.service else None,
            "client_name": self.client.name if self.client else None
        }


class FavoriteBusiness(db.Model):
    __tablename__ = "favorite_business"

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey("client_profile.id"), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("business_profile.id"), nullable=False)

    client = db.relationship("ClientProfile", back_populates="favorite_businesses")
    business = db.relationship("BusinessProfile")

    __table_args__ = (
        db.UniqueConstraint("client_id", "business_id", name="unique_client_business_favorite"),
    )

    def serialize(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "business_id": self.business_id,
            "business": self.business.serialize_search() if self.business else None
        }
