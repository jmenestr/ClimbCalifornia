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

  private
  def ensure_session_token
    self.session_token ||= User.get_token
  end


end
