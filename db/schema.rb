# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151020180153) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "adventure_activities", force: :cascade do |t|
    t.integer  "adventure_id"
    t.integer  "activity_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "adventure_features", force: :cascade do |t|
    t.integer  "adventure_id", null: false
    t.integer  "feature_id",   null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "adventure_features", ["adventure_id", "feature_id"], name: "index_adventure_features_on_adventure_id_and_feature_id", unique: true, using: :btree

  create_table "adventure_likes", force: :cascade do |t|
    t.integer  "adventure_id", null: false
    t.integer  "user_id",      null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "adventure_likes", ["adventure_id", "user_id"], name: "index_adventure_likes_on_adventure_id_and_user_id", unique: true, using: :btree
  add_index "adventure_likes", ["adventure_id"], name: "index_adventure_likes_on_adventure_id", using: :btree

  create_table "adventure_lists", force: :cascade do |t|
    t.integer  "adventure_id", null: false
    t.integer  "list_id",      null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "adventure_lists", ["adventure_id"], name: "index_adventure_lists_on_adventure_id", using: :btree
  add_index "adventure_lists", ["list_id", "adventure_id"], name: "index_adventure_lists_on_list_id_and_adventure_id", unique: true, using: :btree
  add_index "adventure_lists", ["list_id"], name: "index_adventure_lists_on_list_id", using: :btree

  create_table "adventures", force: :cascade do |t|
    t.string   "title",         null: false
    t.text     "description",   null: false
    t.integer  "user_id",       null: false
    t.float    "lat",           null: false
    t.float    "lng",           null: false
    t.string   "location_name", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "climb_styles", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "features", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "follows", force: :cascade do |t|
    t.integer  "followee_id", null: false
    t.integer  "follower_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "follows", ["followee_id", "follower_id"], name: "index_follows_on_followee_id_and_follower_id", unique: true, using: :btree
  add_index "follows", ["followee_id"], name: "index_follows_on_followee_id", using: :btree
  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "image_url",     default: "http://res.cloudinary.com/climb-california/image/upload/v1445363827/rock_climbing_scene_1_x02odj.png"
    t.integer  "imagable_id"
    t.string   "imagable_type"
    t.datetime "created_at",                                                                                                                     null: false
    t.datetime "updated_at",                                                                                                                     null: false
  end

  add_index "images", ["imagable_id"], name: "index_images_on_imagable_id", using: :btree

  create_table "lists", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description"
    t.integer  "user_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.text     "content",      null: false
    t.integer  "rating"
    t.integer  "adventure_id", null: false
    t.integer  "user_id",      null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "reviews", ["adventure_id"], name: "index_reviews_on_adventure_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "seasons", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",                                          null: false
    t.string   "email",                                         null: false
    t.string   "password_digest",                               null: false
    t.string   "session_token",                                 null: false
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "location",        default: "San Francisco, CA"
    t.float    "lat",             default: 37.7833
    t.float    "lng",             default: -122.4167
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
