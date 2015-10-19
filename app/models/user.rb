# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'byebug'
class User < ActiveRecord::Base
  attr_reader :password
  validates :name, :session_token, presence: true 
  validates :email, presence: true, uniqueness: true 
  validates :password, length: { minimum: 6, allow_nil: true }


  has_many :adventures, dependent: :destroy
  has_many :images, as: :imagable
  has_many :adventure_likes, dependent: :destroy
  has_many :saved_adventures, through: :adventure_likes, source: :adventure
  has_many :reviews, dependent: :destroy
  has_many :lists

  has_many :active_relationships,  
    class_name:  "Follow",
    foreign_key: "follower_id",
    dependent:   :destroy
  has_many :passive_relationships, 
    class_name:  "Follow",                         
    foreign_key: "followee_id",
    dependent:   :destroy

  has_many :following, through: :active_relationships,  source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  
  after_initialize :ensure_session_token
  def self.find_by_credentials(email, given_password)
    user = User.find_by(email: email)
    return nil unless user
     user.valid_password?(given_password) ?  user : nil
  end

  def self.get_token
    token = SecureRandom.urlsafe_base64
    while User.exists?(session_token: token)
      token = SecureRandom.urlsafe_base64
    end
    token
  end

  def password=(new_password)
    @password = new_password
    self.password_digest = BCrypt::Password.create(new_password)
  end

  def valid_password?(given_password)
    BCrypt::Password.new(self.password_digest).is_password?(given_password)
  end

  def update_session_token!
    self.session_token = User.get_token
    self.save
    self.session_token
  end

  def self.search(name, activities)
    users = User
    
    if activities
      users = users.joins("LEFT OUTER JOIN adventures ON adventures.user_id = users.id")
      .joins("LEFT OUTER JOIN adventure_likes ON adventure_likes.user_id = users.id")
      .joins("JOIN adventure_activities ON (adventure_activities.adventure_id = adventure_likes.adventure_id OR adventure_activities.adventure_id = adventures.id)")
      .where("adventure_activities.activity_id": activities)
      .group("users.id")
    end
    if name
      users = users.where("LOWER(users.name) LIKE ?", "%#{name}%".downcase)
    end
    users

  end

  def self.feed(current_user)
     user_activities = AdventureActivity.joins(:adventure).where("adventures.user_id = ?", current_user.id)
    .select("adventure_activities.activity_id")
    .group("adventure_activities.activity_id").map { |activity| activity.activity_id }
    user_activities = "(" + user_activities.join(",") + ")"
    adventures = Adventure.joins("LEFT OUTER JOIN  adventure_likes ON adventure_likes.adventure_id = adventures.id")
    .joins("LEFT OUTER JOIN follows ON follows.followee_id = adventures.user_id")
    .joins("LEFT OUTER JOIN adventure_activities ON adventure_activities.adventure_id = adventures.id")
    .where("(adventure_likes.user_id = :id OR follows.followee_id = :id OR adventure_activities.activity_id IN #{user_activities}) AND adventures.user_id != :id",
      id: current_user.id)
    .group("adventures.id")
    adventures
  end

  private
  def ensure_session_token
    self.session_token ||= User.get_token
  end


end
