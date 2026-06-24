from flask import Blueprint, request, jsonify
from api.models import db, BusinessProfile, BusinessGallery
import cloudinary.uploader
from . import business_gallery

def upload_image(file, folder):
    result = cloudinary.uploader.upload(file, folder=folder)
    return result["secure_url"]

# ----------------------------------------------------------------------------------
# BUSINESS GALLERY
# ----------------------------------------------------------------------------------

@business_gallery.route("/", methods=["POST"])
def create_gallery_image():

    business_profile_id = request.form.get("business_profile_id")
    image = request.files.get("image")

    if not business_profile_id or not image:
        return jsonify({
            "msg": "business_profile_id and image are required"
        }), 400

    business = BusinessProfile.query.get(business_profile_id)

    if not business:
        return jsonify({
            "msg": "Business not found"
        }), 404

    images_count = BusinessGallery.query.filter_by(
        business_profile_id=business_profile_id
    ).count()

    if images_count >= 6:
        return jsonify({
            "msg": "Maximum 6 images allowed"
        }), 400

    image_url = upload_image(
        image,
        "business_gallery"
    )

    new_image = BusinessGallery(
        business_profile_id=business_profile_id,
        image_url=image_url
    )

    db.session.add(new_image)
    db.session.commit()

    return jsonify({
        "msg": "Image added successfully",
        "image": new_image.serialize()
    }), 201


@business_gallery.route("/<int:business_profile_id>", methods=["GET"])
def get_gallery_images(business_profile_id):

    images = BusinessGallery.query.filter_by(
        business_profile_id=business_profile_id
    ).all()

    return jsonify({
        "business_profile_id": business_profile_id,
        "images": [image.serialize() for image in images]
    }), 200


@business_gallery.route("/<int:image_id>", methods=["DELETE"])
def delete_gallery_image(image_id):

    image = BusinessGallery.query.get(image_id)

    if not image:
        return jsonify({
            "msg": "Image not found"
        }), 404

    db.session.delete(image)
    db.session.commit()

    return jsonify({
        "msg": "Image deleted successfully"
    }), 200
