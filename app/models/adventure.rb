# == Schema Information
#
# Table name: adventures
#
#  id            :integer          not null, primary key
#  title         :string           not null
#  description   :text             not null
#  user_id       :integer          not null
#  lat           :float            not null
#  lng           :float            not null
#  location_name :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require 'byebug'
class Adventure < ActiveRecord::Base
  validates :title, :description, :user_id, :lat, :lng,
    :location_name, presence: true 

  acts_as_mappable
  has_many :images, as: :imagable
  belongs_to :author, 
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

  has_many :adventure_likes, dependent: :destroy
  has_many :saves, through: :adventure_likes, source: :user

  has_many :adventure_features
  has_many :features, through: :adventure_features
  has_many :reviews

  def self.search_filter(filter)
    # debugger
    northEast = filter[:positionBounds][:northEast].values
    southWest = filter[:positionBounds][:southWest].values
    adventures = self.in_bounds([southWest, northEast])
    if filter[:features]
      adventures = adventures.joins(:adventure_features)
      .where("adventure_features.feature_id": filter[:features])
    end
    adventures
  end

end

